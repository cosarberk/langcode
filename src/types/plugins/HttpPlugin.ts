import { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { PluginDescriptions } from "./plugin";

export type HttpInitConfig = {}; // init gerekmiyor ama interface uyumu için boş bırakıyoruz

export type HttpRunArgs = {
  url: string;
  method?: Method; // "GET", "POST", vs.
  headers?: Record<string, string>;
  params?: Record<string, any>;   // URL query params
  data?: any;                     // POST/PUT body
  timeout?: number;
};

export interface HttpExpose extends PluginDescriptions{
  response:AxiosResponse | null
  config:AxiosRequestConfig | null
}

  export const HttpPluginTypes = {
    runArgs: {} as HttpRunArgs,
    return: "" as string,
    expose:{} as HttpExpose
  };