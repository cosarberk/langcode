import { AgentOpenAIExpose, AgentOpenAIInitConfig, AgentOpenAIRunArgs, Plugin, PluginType } from "../../types";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createAgentExecutor } from "../../base";



export default class AgentOpenAIPlugin
  implements Plugin<AgentOpenAIInitConfig, AgentOpenAIRunArgs, AgentOpenAIExpose,string>
{


  name = "agentOpenAI";
  description = "LangChain agent powered by OpenAI and tools";
  type=PluginType.Agent;
  configExample: AgentOpenAIInitConfig = {
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
  private executor:AgentOpenAIExpose["executor"]  = null;

  expose():AgentOpenAIExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      configExample:this.configExample,
      executor: this.executor
    }
  }

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