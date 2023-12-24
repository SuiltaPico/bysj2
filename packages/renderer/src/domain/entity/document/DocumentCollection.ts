import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Document } from "/@/domain/entity/document/Document";
import { TodoDocument } from "../todo/TodoDocument";

@Entity()
export class DocumentCollection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  name!: string;

  @ManyToMany(() => TodoDocument, (document) => document.document_collections)
  @JoinTable()
  documents!: Document[];
}
