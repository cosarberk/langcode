import { PluginDescriptions } from "./plugin";

export type PdfParserInitConfig = {
  parseMetaOnly?: boolean;
};

export type PdfParserRunArgs = {
  filePath?: string;    // Yerel PDF dosyasının tam yolu
  fileUrl?: string;     // Uzaktan dosya URL'i
  parseMetaOnly?: boolean; // Bu değer init'teki default ayarı geçersiz kılabilir
  returnBuffer?: boolean;
};

export interface PdfParserExpose extends PluginDescriptions {
  parseMetaOnly: boolean
}

export const PdfParserPluginTypes = {
  runArgs: {} as PdfParserRunArgs,
  return: {} as any,
  expose: {} as PdfParserExpose,
};