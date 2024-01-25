import { Entity, PrimaryColumn } from "typeorm";

@Entity()
class PluginStore {
  @PrimaryColumn("text")
  id!: string;


}
