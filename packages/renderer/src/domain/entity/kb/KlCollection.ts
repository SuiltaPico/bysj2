import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { KlItemORMEt } from "./KlItem";

@Entity()
export class KlCollectionEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  name!: string;

  @ManyToMany(() => KlItemORMEt, (it) => it.parent_collection)
  @JoinTable()
  item_children!: KlItemORMEt[];

  @Column("int")
  created_at!: number;
  @Column("int")
  last_modified_at!: number;
}

