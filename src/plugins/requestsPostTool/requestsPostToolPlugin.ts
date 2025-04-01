import { RequestsGetTool, RequestsPostTool } from "langchain/tools";
import { Plugin } from "../../types";
import { PluginType, RequestsPostToolInitConfig, RequestsPostToolRunArgs, RequestsPostToolExpose } from "../../types";
export default class RequestsPostToolPlugin
  implements Plugin<RequestsPostToolInitConfig, RequestsPostToolRunArgs, RequestsPostToolExpose, any> {
  
  name = "requestsPostTool";
  description = "Send HTTP POST requests to a given URL with a JSON body.";
  type = PluginType.Tool;

  configExample: RequestsPostToolInitConfig = { };

  private tool: RequestsPostToolExpose["tool"] = null;

  expose(): RequestsPostToolExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      tool: this.tool,
    };
  }

  async init(config: RequestsPostToolInitConfig) {
    this.tool = new RequestsPostTool();
  }

  async run(args: RequestsPostToolRunArgs): Promise<any> {
    if (!this.tool) throw new Error("Tool is not initialized.");
    return await this.tool.invoke(args);
  }
}