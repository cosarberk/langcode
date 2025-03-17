import { OpenAI } from "@langchain/openai";
import { PluginInterface } from "@/types";

export class OpenAIPlugin implements PluginInterface {
  name = "OpenAI";
  private model!: OpenAI;

  constructor(private config: object) {}

  async initialize() {
    this.model = new OpenAI(this.config);
    console.log("🤖 OpenAI modeli başlatıldı.");
  }

  async execute(prompt: string): Promise<string> {
    return await this.model.invoke(prompt);
  }
}