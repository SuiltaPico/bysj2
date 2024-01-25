import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import type { GiItem } from "../app/Gi";
import { GiItem_transformer } from "../app/Gi";
import { KlCollectionEt } from "./KlCollection";
import { json_transformer } from "/@/common/utils/json";

/** 为 ORM 准备的对象。转译z 为 `KlItemEt` 后，会让 `content_id` 和 `content_type` 结合实际内容，合并成 `content` 属性。 */
@Entity()
export class KlItemORMEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  name!: string;

  @Column("text", {
    transformer: json_transformer,
  })
  vector_id_list!: string[];

  @ManyToMany(() => KlCollectionEt, (it) => it.item_children)
  parent_collection!: KlCollectionEt[];

  @Column("text")
  content_id!: string;

  @Column("text")
  content_type!: KlItemContext["type"];

  @Column("int")
  created_at!: number;
  @Column("int")
  last_modified_at!: number;
}

@Entity()
export class TextKlItemContentEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  type!: "text";

  @Column("text")
  content!: string;
}

@Entity()
export class MountedKlItemContentEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  type!: "mounted";

  @Column("text", {
    transformer: GiItem_transformer,
  })
  content!: GiItem;
}

export const KlItem_entities = [
  KlItemORMEt,
  TextKlItemContentEt,
  MountedKlItemContentEt,
];

export type KlItemContext = TextKlItemContentEt | MountedKlItemContentEt;