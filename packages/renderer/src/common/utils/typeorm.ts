import dayjs from "dayjs";
import { get_curr_timestamp } from "./time";

export function gen_time_transformer(nullable: boolean) {
  if (!nullable) {
    return {
      from(value: any) {
        return dayjs(value as number);
      },
      to(value: any) {
        return (value as dayjs.Dayjs).unix();
      },
    };
  }
  return {
    from(value: any) {
      if (!value) {
        return value;
      }
      return dayjs(value);
    },
    to(value: any) {
      if (value === undefined) {
        return value;
      }
      return (value as dayjs.Dayjs).unix();
    },
  };
}

export function set_draft_time<
  T extends {
    created_at: number;
    last_modified_at: number;
  }
>(target: T) {
  const curr = get_curr_timestamp();
  target.created_at = curr;
  target.last_modified_at = curr;
  return target;
}
