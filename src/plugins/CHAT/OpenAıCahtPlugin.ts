import { PluginInterface } from "@/types";
import { ChatOpenAI } from "@langchain/openai";

import { AIMessage, HumanMessage } from "@langchain/core/messages";

export class ChatOpenAIPlugin implements PluginInterface {
  name = "ChatOpenAI";
  private model!: ChatOpenAI;

  constructor(private config: Partial<ChatOpenAI>) {}

  async initialize() {
    console.log(this.config);
    this.model = new ChatOpenAI(this.config);
    console.log("🤖 ChatOpenAI modeli başlatıldı.");
  }

  async execute(prompts: { role: string; content: string }[]): Promise<string> {
    const messages = prompts.map((prompt) => {
        if (prompt.role === "user") {
          return new HumanMessage(prompt.content);
        } else if (prompt.role === "assistant") {
          return new AIMessage(prompt.content);
        } else {
          throw new Error(`Bilinmeyen rol: ${prompt.role}`);
        }
      });
  
      const response = await this.model.invoke(messages);
      const responseContent = response.content as unknown as string;

      return responseContent;
  }
}