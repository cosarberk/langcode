import { PluginInterface } from "@/types";
import { AI21 } from "@langchain/community/llms/ai21";


export class AI21Plugin implements PluginInterface {
  name = "AI21";
  private model!: AI21;

  constructor(private config: object) {}

  async initialize() {
    console.log(this.config)
    this.model = new AI21(this.config);
    console.log("🤖 AI21 modeli başlatıldı.");
  }

  async execute(prompt: string): Promise<string> {
    return await this.model.invoke(prompt);
  }
}