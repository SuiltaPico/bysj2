import { DataSource } from "typeorm";
import { Tag } from "../entity/tag/Tag";
import { gen_sevice_remove } from "/@/common/utils/service_generator";

export function create_TagService(data_source: DataSource) {
  const result = {
    create<T extends Partial<Tag>>(name: string, option?: { initial?: T }) {
      const tag = data_source.manager.create(Tag, option?.initial);
      tag.name = name;
      return tag as Partial<Tag> & T & { name: string; children: [] };
    },
    remove: gen_sevice_remove(data_source),
  };
  return result;
}
