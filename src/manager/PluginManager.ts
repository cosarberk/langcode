// import { PluginInterface } from "@/types";

import * as AllPlugins from "@/plugins"; 
import { PluginInterface } from "@/types";
import { promises as fs } from "fs";


/**
 * Plugin Yöneticisi
 */
export class PluginManager {
  private plugins: Map<string, PluginInterface> = new Map();

  async loadPlugin(pluginConfig: any) {
    try {
      // console.log("📦 Tüm Pluginler:", AllPlugins); 
      // console.log("🔎 Aranan Plugin:", pluginConfig.name);
      const PluginClass = (AllPlugins as Record<string, any>)[pluginConfig.name+"Plugin"];

      if (!PluginClass) {
        console.warn(`⚠ ${pluginConfig.name} için geçerli bir plugin bulunamadı.`);
        return;
      }

      //  Plugin'i oluştur ve kaydet
      // const plugin = new PluginClass(...Object.values(pluginConfig.configs));
      const plugin = new PluginClass(pluginConfig.configs);

      await this.register(plugin);
    } catch (error) {
      console.error(`🚨 ${pluginConfig.name} yüklenirken hata oluştu:`, error);
    }
  }
  /**
   * Yeni bir plugin ekler ve başlatır
   */
  async register(plugin: PluginInterface) {
    this.plugins.set(plugin.name, plugin);
    await plugin.initialize();
    console.log(`✅ Plugin yüklendi: ${plugin.name}`);
  }

  /**
   * Plugin'i çalıştır
   */
  async run(pluginName: string, ...args: any[]) {
    const plugin = this.plugins.get(pluginName);
    if (!plugin || !plugin.execute) {
      throw new Error(`🚨 Plugin bulunamadı veya çalıştırılamaz: ${pluginName}`);
    }
    return await plugin.execute(...args);
  }

  /**
   * Yüklü Pluginleri Listele
   */
  listPlugins() {
    return Array.from(this.plugins.keys());
  }

  /**
   * JSON'dan Pluginleri Yükle
   */
  async loadFromJSON(jsonPath: string) {
    try {
      // 🔥 config.json dosyasını oku ve parse et
      const configData = await fs.readFile(jsonPath, "utf-8");
      const config = JSON.parse(configData);

      // 🔥 Her plugin için dinamik import ve yükleme yap
      for (const pluginConfig of config.plugins) {
        await this.loadPlugin(pluginConfig);
      }
    } catch (error) {
      console.error("🚨 Plugin konfigürasyon dosyası yüklenirken hata oluştu:", error);
    }
  }

  
  removePlugin(pluginName: string) {
    if (this.plugins.has(pluginName)) {
      this.plugins.delete(pluginName);
      console.log(`🗑 Plugin kaldırıldı: ${pluginName}`);
    } else {
      console.warn(`⚠ Kaldırılacak plugin bulunamadı: ${pluginName}`);
    }
  }
}


