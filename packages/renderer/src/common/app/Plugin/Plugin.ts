import { App } from "../App";

export type PluginFactory<TContext> = () => Plugin<TContext>;

export interface PluginMetaV1 {
  __api: 1;
  /** 插件的名称，不要求唯一。 */
  readonly name: string;
  /** 插件的作者。 */
  readonly author?: string;
  /** 插件的作者邮箱。 */
  readonly email?: string;
  /** 插件的主页。 */
  readonly home_page?: string;
}

/** 插件元信息 */
export type PluginMeta = PluginMetaV1;

export interface PluginHooksV1<TContext> {
  __api: 1;
  /** 当插件安装时。 */
  onInstall(context: TContext): Promise<void>;
  /** 当插件卸载时。 */
  onUninstall?(context: TContext): Promise<void>;
  /**
   * 当当前插件被启动后。
   *
   * 在调用完成后，插件应当返回自己导出的 API。
   */
  onActivate(context: TContext): Promise<Record<any, any>>;
  /** 当当前插件被禁用后 */
  onDeactivate?(context: TContext): Promise<void>;
  /** 当另一个插件被启用后 */
  onAnotherPluginActivate?(plugin: Plugin<TContext>, context: TContext): void;
  /** 当另一个插件被禁用后 */
  onAnotherPluginDeactivate?(plugin: Plugin<TContext>, context: TContext): void;
  /** 当检测到当前插件版本号高于之前的插件版本号后。 */
  onUpdate?(context: TContext): Promise<void>;
}

export type PluginHooks<TContext> = PluginHooksV1<TContext>;

export interface PluginV1<TContext> {
  __api: 1;
  /** 插件的唯一标识符，类似于 `com.xxx.xxx`。 */
  readonly id: string;
  /** 插件的版本 id，遵循语义化版本 2.0.0 规范的命名。
   * @see https://semver.org/lang/zh-CN/spec/v2.0.0.html
   */
  readonly version_id: string;
  /** 插件的元信息。 */
  readonly meta: PluginMetaV1;
  hooks: PluginHooksV1<TContext>;
  /** 插件的依赖项 id。 */
  dependencies: string[];
}

export type Plugin<TContext> = PluginV1<TContext>;
