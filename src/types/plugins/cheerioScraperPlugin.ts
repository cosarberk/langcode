import { PluginDescriptions } from "./plugin";

export type CheerioScraperInitConfig = {
  userAgent?: string;
};

export type CheerioScraperRunArgs = {
  url: string;         // Zorunlu: hangi sayfa
  selector?: string;   // İsteğe bağlı: hangi öğeler
  attribute?: string;  // İsteğe bağlı: src, href vb. bir attribute çekmek için
  returnHtml?: boolean; // true ise text yerine HTML döndür
};

export interface CheerioScraperExpose extends PluginDescriptions {
  userAgent: string | null
}

export const CheerioScraperPluginTypes = {
  runArgs: {} as CheerioScraperRunArgs,
  return: {} as any,
  expose: {} as CheerioScraperExpose,
};