import { Method } from "axios";

export type HttpInitConfig = {}; // init gerekmiyor ama interface uyumu için boş bırakıyoruz

export type HttpRunArgs = {
  url: string;
  method?: Method; // "GET", "POST", vs.
  headers?: Record<string, string>;
  params?: Record<string, any>;   // URL query params
  data?: any;                     // POST/PUT body
  timeout?: number;
};


  export const HttpPluginTypes = {
    runArgs: {} as HttpRunArgs,
    return: "" as string,
  };