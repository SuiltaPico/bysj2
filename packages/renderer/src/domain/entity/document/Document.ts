import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { DocumentCollection } from "./DocumentCollection";
import { Tag } from "../tag/Tag";

export type DocumentContentType = "editorjs";

// @Entity()
export abstract class Document {
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
  @ManyToOne(() => Tag)
  tags!: Tag[];

  @ManyToMany(
    () => DocumentCollection,
    (document_collection) => document_collection.documents
  )
  @JoinTable()
  document_collections!: DocumentCollection[];
}
