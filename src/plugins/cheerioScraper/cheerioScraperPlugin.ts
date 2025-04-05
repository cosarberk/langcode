import { load as cheerioLoad } from "cheerio";
import { Plugin } from "../../types";
import { PluginType, CheerioScraperInitConfig, CheerioScraperRunArgs, CheerioScraperExpose } from "../../types";
import axios from "axios";
export default class CheerioScraperPlugin
  implements Plugin<CheerioScraperInitConfig, CheerioScraperRunArgs, CheerioScraperExpose, any> {
  
  name = "cheerioScraper";
  description = "Cheerio ile HTML parse edip sayfa içeriğini ayrıştırma plugin'i.";
  type = PluginType.Tool;

  configExample: CheerioScraperInitConfig = {
    userAgent: "Mozilla/5.0 (compatible; CheerioBot/1.0)",
  };

  private userAgent:CheerioScraperExpose["userAgent"] = null;

  expose(): CheerioScraperExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      userAgent: this.userAgent,
    };
  }

  async init(config: CheerioScraperInitConfig) {
    const { userAgent } = config;
    this.userAgent = userAgent || "Mozilla/5.0 (compatible; CheerioBot/1.0)";
  }

  async run(args: CheerioScraperRunArgs): Promise<any> {

    const { url, selector, attribute, returnHtml } = args;
    if (!url) {
      throw new Error("Bir 'url' parametresi vermeniz gerekiyor.");
    }

    // 2) HTTP isteği yap
    let responseData: string;
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": this.userAgent || "CheerioBot",
        },
      });
      responseData = response.data;
    } catch (err: any) {
      throw new Error(`HTTP isteği başarısız: ${err.message}`);
    }

    // 3) Cheerio ile parse et (Cheerio v2+)
    const $ = cheerioLoad(responseData);

    // Kullanıcı bir 'selector' tanımladıysa, ilgili öğeleri bul
    if (selector) {
      const elements = $(selector);
      if (elements.length === 0) {
        return { result: null, message: "Seçiciye uygun öğe bulunamadı." };
      }

      // attribute varsa, bu attribute değerlerini döndürelim (ör. 'href', 'src')
      if (attribute) {
        const values = elements.map((i: any, el: any) => $(el).attr(attribute)).get();
        return { result: values };
      }

      // returnHtml == true ise, öğelerin HTML çıktısını al
      if (returnHtml) {
        const htmlValues = elements.map((i: any, el: any) => $.html(el)).get();
        return { result: htmlValues };
      }

      // Varsayılan: text() döndürelim
      const textValues = elements.map((i: any, el: any) => $(el).text()).get();
      return { result: textValues };
    }

    // Seçici yoksa, sayfanın tüm HTML çıktısını döndürelim
    return { html: $.html() };
  
  
  }
}