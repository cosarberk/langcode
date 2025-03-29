import { Tool } from "@langchain/core/tools";

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

export const AgentOpenAIPluginTypes = {
    runArgs: {} as AgentOpenAIRunArgs,
    return: "" as string,
};