export type MessageSource =
  | ModelMessageSource
  | ChatTemplateMessageSource
  | ChatPluginMessageSource
  | UserMessageSource;

export interface BaseMessageSource {
  reason_of_create?: string;
  creation: number;
  type: string;
}

export interface ModelMessageSource extends BaseMessageSource {
  type: "model";
  model_source_id: string;
  model_used: string;
  token_consumed?: number;
  end_generation_time: number;
}

export interface ChatTemplateMessageSource extends BaseMessageSource {
  type: "chat_template";
  chat_template_id: string;
}

export interface ChatPluginMessageSource extends BaseMessageSource {
  type: "chat_plugin";
  chat_plugin_id: string;
}

export interface UserMessageSource extends BaseMessageSource {
  type: "user";
}
