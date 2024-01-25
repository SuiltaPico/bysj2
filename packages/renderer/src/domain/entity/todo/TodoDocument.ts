import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { DocumentContentType } from "../document/Document";
import { TodoItemEt } from "./TodoItem";
import { Tag } from "../tag/Tag";
import { DocumentCollection } from "../document/DocumentCollection";

@Entity()
export class TodoDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content_type!: DocumentContentType;

  /**
   * @default ""
   */
  @Column("text", {
    default: "",
  })
  content!: string;

  /** 标签组。 */
  @ManyToMany(() => Tag)
  tags!: Tag[];

  @ManyToMany(
    () => DocumentCollection,
    (document_collection) => document_collection.documents
  )
  @JoinTable()
  document_collections!: DocumentCollection[];

  @OneToOne(() => TodoItemEt, (item) => item.document)
  todo_item: TodoItemEt | undefined;
}
