import { RequestsGetTool, RequestsPostTool } from "langchain/tools";

import { PluginDescriptions } from "./plugin";

export type RequestsPostToolInitConfig = {};

export type RequestsPostToolRunArgs = {
  url: string;
  data: Record<string, any>;
};

export interface RequestsPostToolExpose extends PluginDescriptions {
tool: RequestsPostTool | null 
}

export const RequestsPostToolPluginTypes = {
  runArgs: {} as RequestsPostToolRunArgs,
  return: {} as any,
  expose: {} as RequestsPostToolExpose,
};