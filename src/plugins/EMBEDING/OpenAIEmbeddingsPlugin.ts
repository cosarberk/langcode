import { OpenAIEmbeddings } from "@langchain/openai";
import { PluginInterface } from "@/types";

export class OpenAIEmbeddingsPlugin implements PluginInterface {
  name = "OpenAIEmbeddings";
  private model!: OpenAIEmbeddings;

  constructor(private config: object) {}

  async initialize() {
    this.model = new OpenAIEmbeddings(this.config);
    console.log("🤖 OpenAI modeli embeding başlatıldı.");
  }

  async execute(prompt: string): Promise<number[]> {
    return await this.model.embedQuery(prompt);
  }
}