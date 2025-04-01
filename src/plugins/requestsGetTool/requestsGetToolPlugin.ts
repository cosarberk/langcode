import { RequestsGetTool, RequestsPostTool } from "langchain/tools";

import { Plugin } from "../../types";
import { PluginType, RequestsGetToolInitConfig, RequestsGetToolRunArgs, RequestsGetToolExpose } from "../../types";
export default class RequestsGetToolPlugin
  implements Plugin<RequestsGetToolInitConfig, RequestsGetToolRunArgs, RequestsGetToolExpose, any> {
  
  name = "requestsGetTool";
  description = "Send HTTP GET requests to any URL and retrieve text content.";
  type = PluginType.Tool;

  configExample: RequestsGetToolInitConfig = {};

  private tool: RequestsGetToolExpose["tool"] = null;

  expose(): RequestsGetToolExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      tool: this.tool,
    };
  }

  async init(config: RequestsGetToolInitConfig) {
    this.tool = new RequestsGetTool();
  }

  async run(args: RequestsGetToolRunArgs): Promise<any> {
    if (!this.tool) throw new Error("Tool is not initialized.");
    return await this.tool.invoke(args);
  }
}