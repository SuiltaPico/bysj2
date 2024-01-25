import { AppError } from "../../AppError";
import { Plugin, PluginFactory } from "../Plugin";
import { PluginServiceCacheService } from "./PluginServiceCacheService";

export interface PluginService<TContext> {
  context: TContext;
  plugin_inst_map: Record<string, Plugin<TContext>>;
  install_plugin(plugin: PluginFactory<TContext>): Promise<void>;
  install_file_plugin(path: string): Promise<void>;
  uninstall_plugin(plugin_id: string): Promise<void>;
  enable_plugin(plugin_id: string): Promise<void>;
  disable_plugin(plugin_id: string): Promise<void>;
}

class PluginServiceError extends AppError {
  type = "PluginServiceError";
  sub_type: string;
  meta: Record<string, any>;
  constructor(sub_type: string, meta: Record<string, any>) {
    super();
    this.sub_type = sub_type;
    this.meta = meta;
  }
}

export function create_PluginService<TContext>(
  context: TContext,
  plugin_service_cache: PluginServiceCacheService
) {
  const service: PluginService<TContext> = {
    context,
    plugin_inst_map: {},
    async install_plugin(plugin) {
      let plugin_inst: Plugin<TContext>;
      try {
        plugin_inst = plugin();
      } catch (e) {
        throw new PluginServiceError(
          "[PluginService] An error occurred while instantiating the plugin.",
          {
            plugin,
            error: e,
            context,
          }
        );
      }
      try {
        await plugin_inst.hooks.onInstall(context);
      } catch (e) {
        throw new PluginServiceError(
          "[PluginService] Plugin installation error occurred.",
          {
            plugin,
            error: e,
          }
        );
      }
      service.plugin_inst_map[plugin_inst.id] = plugin_inst;
    },
    async uninstall_plugin(plugin) {
      try {
        await plugin.hooks.onUninstall(context);
      } catch (e) {
        throw new PluginServiceError("plugin_uninstall_faild", {
          plugin,
        });
      }
      service.plugin_inst_map.push(plugin);
    },
  };
}
