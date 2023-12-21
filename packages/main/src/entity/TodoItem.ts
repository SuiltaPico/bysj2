import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from "typeorm";

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brief: string;

  @Column(() => Document)
  document: Document;

  @CreateDateColumn()
  created_at: boolean;
}
