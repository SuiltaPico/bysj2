import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import { json_transformer } from "/@/common/utils/json";

@Entity()
export class VectorItemEt {
  @PrimaryGeneratedColumn()
  id!: string;

  /** 多对一 */
  @Column("text")
  model_source_id!: string;

  @Column("blob")
  vector!: Blob;

  @Column("text")
  vector_type!: "openai"

  @CreateDateColumn()
  created_at!: number;
}

export class VectorSv {}

export type OpenAIModelSourceEtDefaultModel = {
  chat_completions: string;
  embeddings: string;
};

@Entity()
export class OpenAIModelSourceEt {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column("text")
  name!: string;

  @Column("text")
  apikey!: string;

  /** 如果为空，则为 `""` */
  @Column("text")
  base_url!: string;

  @Column("text", {
    transformer: json_transformer
  })
  default_model!: OpenAIModelSourceEtDefaultModel;
}

export type ModelSourceEt = OpenAIModelSourceEt;
