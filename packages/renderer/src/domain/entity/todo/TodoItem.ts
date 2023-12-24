import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Tag } from "../tag/Tag";
import { TodoDocument } from "./TodoDocument";
import { TodoEnableCondition } from "./TodoEnableCondition";
import { TodoTriggerEvent } from "./TodoTriggerEvent";
import dayjs from "dayjs";
import { gen_time_transformer } from "/@/common/utils/typeorm";

/** 待办状态。
 * * "InProgress" - 进行中
 * * "Finished" - 已完成
 * * "NotStart" - 未开始
 * * "Paused" - 已暂停
 * * "Cancelled" - 已取消
 */
type TodoStatus =
  | "InProgress"
  | "Finished"
  | "NotStart"
  | "Paused"
  | "Cancelled";

/** 待办事项。 */
@Entity()
@Tree("closure-table")
export class TodoItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  status!: TodoStatus;

  /** 待办简介。 */
  @Column("text")
  summary!: string;

  /** 待办文档。 */
  @OneToOne(() => TodoDocument, (document) => document.todo_item, {
    cascade: true,
  })
  @JoinColumn()
  document!: TodoDocument;

  /** 标签组。 */
  @ManyToOne(() => Tag)
  tags!: Tag[];

  /** 子待办。 */
  @TreeChildren()
  children!: TodoItem[];

  /** 父待办。 */
  @TreeParent()
  parent: TodoItem | undefined;

  /** 置顶级别。 */
  @Column("int")
  pinned_level!: number;

  /** 重要程度描述。
   *
   * 关于该待办事项的重要程度的文本描述。用户描述后，可以由 AI 生成重要程度级别。 */
  @Column("text", {
    nullable: true,
    default: undefined,
  })
  importance_desc: string | undefined;

  /** 重要程度级别。`[0~6)` 之间的浮点数。
   *
   * 标识当前待办的重要程度。重要程度是指该待办事项的完成会给自身以及他人带来的影响程度。 */
  @Column("float", {
    nullable: true,
    default: undefined,
  })
  importance_level!: number | undefined;

  /** 紧急程度描述。
   *
   * 关于该待办事项的紧急程度的文本描述。用户描述后，可以由 AI 生成紧急程度级别。 */
  @Column("text", {
    nullable: true,
    default: undefined,
  })
  urgency_desc!: string;

  /** 紧急程度级别。`[0~6)` 之间的浮点数。
   *
   * 标识当前待办的紧急程度。紧急程度是指该待办事项距离不可完成的期限的接近程度。 */
  @Column("float", {
    nullable: true,
    default: undefined,
  })
  urgency_level: number | undefined;

  /** 截止时间。 */
  @Column("int", {
    nullable: true,
    default: undefined,
    transformer: gen_time_transformer(true),
  })
  deadline!: Date | undefined;

  /** 启用条件。 */
  @ManyToMany(() => TodoEnableCondition)
  @JoinTable()
  enable_conditions!: TodoEnableCondition[];

  /** 待办在各个生命周期下会触发的事件。 */
  @ManyToMany(() => TodoTriggerEvent)
  @JoinTable()
  trigger_events!: TodoTriggerEvent[];
}
