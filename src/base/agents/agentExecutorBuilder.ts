import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Tool } from "@langchain/core/tools";

export type DynamicAgentExecutorConfig = {
  llm: BaseChatModel;
  prompt: ChatPromptTemplate;
  tools: Tool[];
};

export async function createAgentExecutor(config: DynamicAgentExecutorConfig): Promise<AgentExecutor> {
  const { llm, prompt, tools } = config;

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  const executor = new AgentExecutor({
    agent,
    tools,
  });

  return executor;
}


