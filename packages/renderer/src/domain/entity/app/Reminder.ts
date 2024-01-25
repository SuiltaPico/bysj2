import { EventEmitter2 } from "eventemitter2";
import { GiItem_transformer, type GiItem, GiSv } from "./Gi";

import {
  Column,
  CreateDateColumn,
  Entity,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";
import dayjs, { Dayjs } from "dayjs";
import { get_curr_timestamp } from "/@/common/utils/time";
import { Job, scheduleJob } from "node-schedule";

@Entity()
export class ReminderItemEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text", {
    transformer: GiItem_transformer,
  })
  name!: GiItem;

  @Column("text", {
    transformer: GiItem_transformer,
  })
  content!: GiItem;

  @Column("int")
  reminder_at!: number;

  @Column("int")
  created_at!: number;
}

export class ReminderSv {
  /**
   * ### 事件列表
   * * `expired`：当有提醒过期的时候。
   */
  event_emitter = new EventEmitter2();
  repo: Repository<ReminderItemEt>;
  today_schedules: Record<string, Job> = {};

  constructor(repo: Repository<ReminderItemEt>, gisv: GiSv) {
    this.repo = repo;
    const current = dayjs(get_curr_timestamp());
    const next_day_zero_hour = current.hour(0).add(1, "day");
    // 设定时器时间为 `x`，为 `现在<x<明天零点` 的 reminder 设置定时器
    // 定时器结束则触发 `this.event_emitter` 的 `expired` 事件
    this._start_schedule_loop(next_day_zero_hour);
    this._try_emit_expired_list();
  }

  /** `_start_schedule` 的包装。为了防止无限递归，采用了循环的方法。 */
  async _start_schedule_loop(next_day_zero_hour: Dayjs) {
    let ndzh = next_day_zero_hour;
    while (true) {
      await this._start_schedule(ndzh);
      ndzh = ndzh.add(1, "day");
    }
  }

  /** 调度现在以后，今天内过期的 reminders，每天十二点定时从数据库加载下一天之前过期的 reminders。 */
  async _start_schedule(next_day_zero_hour: Dayjs) {
    await this._schedule_today_reminders(next_day_zero_hour);
    return await new Promise<void>((res) => {
      scheduleJob(
        dayjs().format("YYYY-MM-DD HH:mm:ssZ[Z]"),
        next_day_zero_hour.toDate(),
        async () => {
          res(undefined);
        }
      );
    });
  }

  /** 调度现在之后，今天内过期的 reminders */
  async _schedule_today_reminders(next_day_zero_hour: Dayjs) {
    const today_reminders = await this._get_today_reminders(next_day_zero_hour);

    today_reminders.forEach((it) => {
      // 如果到时，则触发 `expired` 事件
      this._schedule_reminders(it);
    });
  }

  _schedule_reminders(ri: ReminderItemEt) {
    const new_job = scheduleJob(
      `reminder${ri.id}`,
      dayjs(ri.reminder_at).toDate(),
      () => {
        this.event_emitter.emitAsync("expired", this);
      }
    );
    this.today_schedules[ri.id] = new_job;
  }

  /** 获取现在以后，今天内过期的 reminders。 */
  async _get_today_reminders(next_day_zero_hour: Dayjs) {
    /** 获取明天零点 */
    return await this.repo.findBy({
      reminder_at: MoreThan(LessThan(next_day_zero_hour.valueOf())),
    });
  }

  /** 检查当前的过期 reminder，如果有则触发 `expired` 事件 */
  async _try_emit_expired_list() {
    const current = dayjs(get_curr_timestamp());
    const expired_list = await this.get_expired_list(current);

    if (expired_list.length > 0) {
      this.event_emitter.emitAsync("expired", this);
    }
  }

  /** 如果这个 reminder 符合今日调度条件，则加入今日调度计划中。如果已经过期，则触发 `expired` 事件。 */
  async _check_new_reminder(
    ri: ReminderItemEt,
    current: Dayjs,
    next_day_zero_hour: Dayjs
  ) {
    if (
      ri.reminder_at > current.valueOf() &&
      ri.reminder_at < next_day_zero_hour.valueOf()
    ) {
      this._schedule_reminders(ri);
    } else if (ri.reminder_at <= current.valueOf()) {
      await this._try_emit_expired_list();
    }
  }

  /** 获取已经超过提醒时间的 `ReminderItemEt`。 */
  async get_expired_list(curr: Dayjs) {
    const expired_reminders = await this.repo.findBy({
      reminder_at: LessThanOrEqual(curr.valueOf()),
    });
    return expired_reminders;
    // 获取已经过期但是未删除的提醒
  }

  async create(name: GiItem, content: GiItem, reminder_at: number) {
    const ri = new ReminderItemEt();
    ri.name = name;
    ri.content = content;
    ri.reminder_at = reminder_at;
    ri.created_at = new Date().getTime();
    const created_ri = await this.repo.save(ri);

    const current = dayjs(get_curr_timestamp());
    const next_day_zero_hour = current.hour(0).add(1, "day");
    this._check_new_reminder(created_ri, current, next_day_zero_hour);

    return created_ri;
  }
  async remove(id: string) {
    this.today_schedules[id]?.cancel();

    const reminder = await this.repo.findOneBy({ id });
    if (reminder) {
      await this.repo.remove(reminder);
      return true;
    }
    return false;
  }
  async modify(item: ReminderItemEt) {
    this.today_schedules[item.id]?.cancel();
    const old = await this.repo.exist({
      where: {
        id: item.id,
      },
    });
    if (!old) return false;
    const modified_ri = await this.repo.save(item);

    const current = dayjs(get_curr_timestamp());
    const next_day_zero_hour = current.hour(0).add(1, "day");
    await this._check_new_reminder(modified_ri, current, next_day_zero_hour);
    return true;
  }
  async get(id: string) {
    return await this.repo.findOneBy({ id });
  }

  /**
   *
   * @param {number} page 从 1 开始。
   */
  async get_list(page: number, page_size: number) {
    return await this.repo.find({
      skip: page * (page_size - 1),
      take: page_size,
    });
  }
}
