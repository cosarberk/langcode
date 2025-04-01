import { Tool } from "@langchain/core/tools";
import { PluginDescriptions } from "./plugin";
import { createAgentExecutor } from "../../base";

export type AgentOpenAIInitConfig = {
  apiKey: string;
  model?: string;
  temperature?: number;
  tools: Tool[];
  messages: {
    role: "system" | "user" | "assistant" | "function";
    content: string;
  }[];
};

export type AgentOpenAIRunArgs = {
  input: string;
};

export interface AgentOpenAIExpose extends PluginDescriptions{
  executor:Awaited<ReturnType<typeof createAgentExecutor>> | null
}

export const AgentOpenAIPluginTypes = {
    runArgs: {} as AgentOpenAIRunArgs,
    return: "" as string,
    expose:{} as AgentOpenAIExpose
};