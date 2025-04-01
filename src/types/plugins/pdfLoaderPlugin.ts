import { PluginDescriptions } from "./plugin";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export type PdfLoaderInitConfig = {
  path: string;
};

export type PdfLoaderRunArgs = {};

export interface PdfLoaderExpose extends PluginDescriptions {
  loader: PDFLoader | null;
}

export const PdfLoaderPluginTypes = {
  runArgs: {} as PdfLoaderRunArgs,
  return: {} as any,
  expose: {} as PdfLoaderExpose,
};