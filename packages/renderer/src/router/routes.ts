import { RouteDefinition } from "@solidjs/router";
import AIAssistant from "../components/page/AIAssistant";
import DocumentManager from "../components/page/DocumentManager";
import Plugin from "../components/page/Plugin";
import Project from "../components/page/Project";
import Setting from "../components/page/Setting";
import TodoList from "../components/page/TodoList/TodoList";

export type AppRouteDefinition = RouteDefinition & {
  name?: string;
  showing?: boolean;
  ref?: AppRouteDefinition;
  icon?: string;
};

const ai_assistant_route = {
  name: "AI助理",
  path: "/ai-assistant",
  component: AIAssistant,
  icon: "hexagon-3d",
};

export const routes: AppRouteDefinition[] = [
  ai_assistant_route,
  {
    path: "/",
    component: AIAssistant,
    showing: false,
    ref: ai_assistant_route,
  },
  {
    name: "待办",
    path: "/todo-list",
    component: TodoList,
    icon: "list-details",
  },
  {
    name: "项目",
    path: "/project",
    component: Project,
    icon: "chart-arrows",
  },
  {
    name: "文档管理",
    path: "/document-manager",
    component: DocumentManager,
    icon: "folders",
  },
  {
    name: "插件",
    path: "/plugin",
    component: Plugin,
    icon: "puzzle",
  },
  {
    name: "设置",
    path: "/setting",
    component: Setting,
    icon: "settings",
  },
];
