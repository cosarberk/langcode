import axios, { AxiosRequestConfig } from "axios";
import { HttpInitConfig, HttpRunArgs ,Plugin} from "../../types";


export default class HttpPlugin implements Plugin<HttpInitConfig, HttpRunArgs, any> {
  name = "http";
  description = "Generic HTTP client using axios for API requests.";

  async init(config: HttpInitConfig) {
    // Bu plugin için özel init gerekmez
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

    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      params,
      data,
      timeout,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data || error?.message || "Unknown HTTP error";
      throw new Error(`HTTP Error: ${message}`);
    }
  }
}