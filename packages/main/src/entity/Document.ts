import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brief: string;

  @Column()
  docu: string;

  @Column()
  isActive: boolean;
}
