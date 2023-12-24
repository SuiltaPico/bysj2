import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TodoTriggerEvent {
  @PrimaryGeneratedColumn()
  id!: number;
}
