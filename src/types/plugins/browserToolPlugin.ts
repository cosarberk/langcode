import { Browser } from "puppeteer";
import { PluginDescriptions } from "./plugin";

export type BrowserToolInitConfig = {
  headless?: boolean; 
  defaultViewport?: {
    width: number;
    height: number;
  };
};

export type BrowserToolRunArgs = {
  url: string;               // Hangi URL'e gidilecek
  selector?: string;         // Bir element seçici (ör. "#loginButton")
  action?: "click" | "type"; // Şimdilik basit örnek: tıklama veya yazma
  input?: string;            // "type" aksiyonu için yazılacak metin
  evaluate?: (() => any) | string; 
};

export interface BrowserToolExpose extends PluginDescriptions {
 browser: Browser | null 
}

export const BrowserToolPluginTypes = {
  runArgs: {} as BrowserToolRunArgs,
  return: {} as any,
  expose: {} as BrowserToolExpose,
};