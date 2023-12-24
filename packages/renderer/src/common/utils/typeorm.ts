import dayjs from "dayjs";

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
