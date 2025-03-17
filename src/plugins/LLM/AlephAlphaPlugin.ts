import { PluginInterface } from "@/types";
import { AlephAlpha } from "@langchain/community/llms/aleph_alpha";


export class AlephAlphaPlugin implements PluginInterface {
  name = "AlephAlpha";
  private model!: AlephAlpha;

  constructor(private config: object) {}

  async initialize() {
    this.model = new AlephAlpha(this.config);
    console.log("🤖 AlephAlpha modeli başlatıldı.");
  }

  async execute(prompt: string): Promise<string> {
    return await this.model.invoke(prompt);
  }
}