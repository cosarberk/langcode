import { PluginInterface } from "@/types";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";


export class DuckDuckGoSearchPlugin implements PluginInterface {
  name = "DuckDuckGoSearch";
  private tool!: DuckDuckGoSearch;

  constructor(private config: object) {}

  async initialize() {
    this.tool = new DuckDuckGoSearch(this.config);
    console.log("🤖 DuckDuckGoSearch tooli başlatıldı.");
  }

  async execute(prompt: string): Promise<string> {
    return await this.tool.invoke(prompt);
  }
}