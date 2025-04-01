import axios from "axios";
import { HttpExpose, HttpInitConfig, HttpRunArgs ,Plugin, PluginType} from "../../types";


export default class HttpPlugin implements Plugin<HttpInitConfig, HttpRunArgs,HttpExpose, any> {
  name = "http";
  description = "Generic HTTP client using axios for API requests.";
  configExample={}
  type=PluginType.LangCodeTool;
  private response:HttpExpose["response"] | null = null
  private config:HttpExpose["config"] | null = null

  async init(config: HttpInitConfig) {
    // Bu plugin için özel init gerekmez
  }

  expose(): HttpExpose {
   return { name:this.name,
    description:this.description,
    type:this.type,
    configExample:this.configExample,
    response:this.response,
    config:this.config
   }
  }

  async run(args: HttpRunArgs): Promise<any> {
    const {
      url,
      method = "GET",
      headers = {},
      params,
      data,
      timeout = 10000,
    } = args;

    const config: HttpExpose["config"] = {
      url,
      method,
      headers,
      params,
      data,
      timeout,
    };  
     this.config = config
    try {
      const response:HttpExpose["response"] = await axios(config);
      this.response =response
      return response?.data;
    } catch (error: any) {
      const message = error?.response?.data || error?.message || "Unknown HTTP error";
      throw new Error(`HTTP Error: ${message}`);
    }
  }
}