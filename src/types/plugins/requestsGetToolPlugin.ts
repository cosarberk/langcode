import { RequestsGetTool, RequestsPostTool } from "langchain/tools";

import { PluginDescriptions } from "./plugin";

export type RequestsGetToolInitConfig = {};

export type RequestsGetToolRunArgs = {
  url: string;
};

export interface RequestsGetToolExpose extends PluginDescriptions {
  tool: RequestsGetTool | null;
}

export const RequestsGetToolPluginTypes = {
  runArgs: {} as RequestsGetToolRunArgs,
  return: {} as any,
  expose: {} as RequestsGetToolExpose,
};