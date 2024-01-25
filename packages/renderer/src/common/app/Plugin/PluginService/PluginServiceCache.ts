import { Column, PrimaryColumn } from "typeorm";
import type { PluginMeta } from "../Plugin";

export class PluginServiceCache {
  @PrimaryColumn()
  id!: string;

  @Column()
  version_id!: string;

  @Column()
  plugin_meta!: PluginMeta;
}
