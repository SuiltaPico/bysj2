import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";

@Entity()
@Tree("closure-table")
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  name!: string;

  @TreeChildren()
  children!: Tag[];

  @TreeParent()
  parent!: Tag;
}

new Tag()