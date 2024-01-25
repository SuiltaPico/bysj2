import { parse_json, stringify_json } from "/@/common/utils/json";
import { get_curr_timestamp } from "/@/common/utils/time";

/** 生成式信息命令描述符
 *
 * 该描述符描述了一段命令的调用。 */
export interface GiCommandDesc {
  _base_type: "GiCommandDesc";
  type: "command";
  content: string;
  param: (GiCommandDesc | any)[];
}

/** 生成式信息描述符
 *
 * 用于描述生成式信息项的部分内容的生成方式。 */
export type GiDesc = string | GiCommandDesc;

export interface StringGiItem {
  type: "string";
  content: GiDesc[];
  created: number;
}

/** 生成式信息项
 *
 * 一段可以被序列化的信息，它描述了要生成的信息如何由生成式信息描述符组成的。
 */
export type GiItem = StringGiItem;

export class GiItemFactory {
  static string(...content: GiDesc[]): StringGiItem {
    return {
      type: "string",
      content,
      created: get_curr_timestamp(),
    };
  }
}

/** 生成式信息服务。 */
export class GiSv {
  command_map: Map<string, (...args: any[]) => any> = new Map();
  register_command(name: string, handler: (...args: any[]) => GiItem) {
    this.command_map.set(name, handler);
  }
  async generate<T extends GiItem>(
    item: T
  ): Promise<T extends StringGiItem ? string : never> {
    // @ts-ignore
    return "";
  }
  static stringify(item: GiItem): string {
    return stringify_json(item);
  }
  static parse<T extends GiItem>(item_src: string): T {
    return parse_json<T>(item_src);
  }
}

export const GiItem_transformer = {
  from: GiSv.stringify,
  to: GiSv.parse,
};
