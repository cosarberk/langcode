import { Plugin } from "../../types";
import { PluginType, DuckduckgoPluginInitConfig, DuckduckgoPluginRunArgs, DuckduckgoPluginExpose } from "../../types";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";



export default class DuckduckgoPluginPlugin
  implements Plugin<DuckduckgoPluginInitConfig, DuckduckgoPluginRunArgs, DuckduckgoPluginExpose, any> {
  
  name = "duckduckgoPlugin";
  description = "Search the web using DuckDuckGo search engine.";
  type = PluginType.Tool;
  RunConfigExample:DuckduckgoPluginRunArgs={
    query: ""
  }
  InitConfigExample: DuckduckgoPluginInitConfig = {
    maxResults: 3,
    searchOptions: {
      safeSearch: 0,
      locale: "en-us",
      region: "wt-wt",
    },
  };

  private tool: DuckduckgoPluginExpose["tool"]  = null;

  expose(): DuckduckgoPluginExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      tool: this.tool,
    };
  }

  async init(config: DuckduckgoPluginInitConfig) {
    this.tool = new DuckDuckGoSearch({
      maxResults: config.maxResults,
      searchOptions: config.searchOptions,
    });
  }

  async run(args: DuckduckgoPluginRunArgs): Promise<any> {
    if (!this.tool) throw new Error("DuckDuckGo aracı başlatılmadı.");
    return await this.tool.invoke(args.query);
  }
}