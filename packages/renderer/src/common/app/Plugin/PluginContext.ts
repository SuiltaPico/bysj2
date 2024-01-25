import { Plugin } from "./Plugin";

export interface PluginContext {
  plugin_inst: () => Plugin<PluginContext>;
  path: {
    pack_dir: () => string;
    /** 插件的数据文件夹 */
    data_dir: () => string;
    /** 临时文件夹。生命周期与 App 相同。 */
    temp_dir: () => string;
  };
  /** 依赖项导出的接口。 */
  dependencies_exposed: Record<string, Promise<any>>;
  /** 获取某个插件导出的接口。 */
  get_plugin_exposed(
    plugin_id: Plugin<PluginContext>["id"]
  ): Promise<any | undefined>;
}
