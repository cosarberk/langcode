import { Plugin } from "../../types";
import { PluginType, SerpAPIToolInitConfig, SerpAPIToolRunArgs, SerpAPIToolExpose } from "../../types";
import { SerpAPI } from "@langchain/community/tools/serpapi";


export default class SerpAPIToolPlugin
  implements Plugin<SerpAPIToolInitConfig, SerpAPIToolRunArgs, SerpAPIToolExpose, any> {
  
  name = "serpAPITool";
  description = "Use SerpAPI to fetch search results from Google.";
  type = PluginType.Tool;
  RunConfigExample:SerpAPIToolRunArgs={
    query: ""
  }

  InitConfigExample: SerpAPIToolInitConfig = {
    apiKey: "serpapi-api-key",
    params: {
      q: "langchain nedir",
      location: "Istanbul,Turkey",
      gl: "tr",
      hl: "tr",
    }
  };
  private tool: SerpAPIToolExpose["tool"] = null;

  expose(): SerpAPIToolExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      tool: this.tool,
    };
  }

  async init(config: SerpAPIToolInitConfig) {
    this.tool = new SerpAPI(config.apiKey, config.params);
  }

  async run(args: SerpAPIToolRunArgs): Promise<any> {
    if (!this.tool) throw new Error("SerpAPI plugin is not initialized.");
    return await this.tool.invoke(args.query);  }
}