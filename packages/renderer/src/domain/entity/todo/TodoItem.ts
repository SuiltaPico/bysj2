import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Tag } from "../tag/Tag";
import { TodoDocument } from "./TodoDocument";
import { TodoEnableCondition } from "./TodoEnableCondition";
import { TodoTriggerEvent } from "./TodoTriggerEvent";
import dayjs from "dayjs";
import { gen_time_transformer } from "/@/common/utils/typeorm";

/** 待办事项状态。待办事项状态是一个字符串枚举类型，表示待办事项的完成状态。
 * * "Todo" - 待办
 * * "Finished" - 已完成
 * * "Cancelled" - 已取消
 */
export type TodoStatus = "Todo" | "Finished" | "Cancelled";

/** 待办内容
 *
 * 待办内容用于表示一个待办事项的内容。 */
export type TodoContext = StringTodoContext;

export interface StringTodoContext {
  type: "string";
  content: string;
}

export interface TodoItem {
  name: string;
  status: TodoStatus;
  content: TodoContext;
  expiration_time?: number;
  creation: number;
}

/** 待办事项。 */
@Entity()
@Tree("closure-table")
@Index("todo_item_preview_index", ["pinned_level", "create_date"])
export class TodoItemEt implements TodoItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  name!: string;

  @Column("text")
  status!: TodoStatus;

  @Column("text")
  content!: TodoContext;

  @Column("int", {
    nullable: true,
  })
  expiration_time?: number;

  @Column("int")
  creation!: number;

  @Column("int")
  last_modified!: number;
}
