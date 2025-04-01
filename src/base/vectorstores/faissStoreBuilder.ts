import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { Logger } from "../../core";

export type FaissCreateConfig = {
  embeddings: OpenAIEmbeddings;
  documents: Document[];
  logger?: Logger;
};

export type FaissSaveConfig = {
  store: FaissStore;
  path: string;
  logger?: Logger;
};

export type FaissLoadConfig = {
  embeddings: OpenAIEmbeddings;
  path: string;
  logger?: Logger;
};

export async function createFaissStore(config: FaissCreateConfig): Promise<FaissStore> {
  try {
    config.logger?.log("📦 FAISS store oluşturuluyor...");
    const store = await FaissStore.fromDocuments(config.documents, config.embeddings);
    config.logger?.log("✅ FAISS store oluşturuldu.");
    return store;
  } catch (err) {
    config.logger?.log("❌ FAISS store oluşturulurken hata:", err);
    throw err;
  }
}

export async function saveFaissStore(config: FaissSaveConfig): Promise<void> {
  try {
    config.logger?.log(`💾 FAISS store '${config.path}' konumuna kaydediliyor...`);
    await config.store.save(config.path);
    config.logger?.log("✅ FAISS store başarıyla kaydedildi.");
  } catch (err) {
    config.logger?.log("❌ FAISS store kaydederken hata:", err);
    throw err;
  }
}

export async function loadFaissStore(config: FaissLoadConfig): Promise<FaissStore> {
  try {
    config.logger?.log(`📂 FAISS store '${config.path}' konumundan yükleniyor...`);
    const store = await FaissStore.load(config.path, config.embeddings);
    config.logger?.log("✅ FAISS store başarıyla yüklendi.");
    return store;
  } catch (err) {
    config.logger?.log("❌ FAISS store yüklenirken hata:", err);
    throw err;
  }
}