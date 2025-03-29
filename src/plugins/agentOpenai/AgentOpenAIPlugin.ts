import { AgentOpenAIInitConfig, AgentOpenAIRunArgs, Plugin } from "../../types";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createAgentExecutor } from "../../base";



export default class AgentOpenAIPlugin
  implements Plugin<AgentOpenAIInitConfig, AgentOpenAIRunArgs, string>
{


  name = "agentOpenAI";
  description = "LangChain agent powered by OpenAI and tools";
  static exampleConfig: AgentOpenAIInitConfig = {
    apiKey: "sk-xxx",
    model: "gpt-4o",
    temperature: 0.7,
    tools: [], // örnek: [new Calculator()]
    messages: [
      { role: "system", content: "Bir assistant gibi davran." },
      { role: "user", content: "{input}" },
      { role: "assistant", content: "{agent_scratchpad}" },
    ],
  };
  private executor: Awaited<ReturnType<typeof createAgentExecutor>> | null = null;

  async init(config: AgentOpenAIInitConfig) {
    const llm = new ChatOpenAI({
      apiKey: config.apiKey,
      model: config.model || "gpt-4o",
      temperature: config.temperature ?? 0.7,
    });

    const prompt = ChatPromptTemplate.fromMessages(
      config.messages.map((m) => [m.role, m.content] as [string, string])
    );

    this.executor = await createAgentExecutor({
      llm,
      prompt,
      tools: config.tools,
    });
  }

  async run(args: AgentOpenAIRunArgs): Promise<string> {
    if (!this.executor) throw new Error("Agent not initialized.");
    const result = await this.executor.invoke({ input: args.input });
    return typeof result === "string" ? result : JSON.stringify(result, null, 2);
  }
}