import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TodoEnableCondition {
  @PrimaryGeneratedColumn()
  id!: number;
}
