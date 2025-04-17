import { Plugin } from "../../types";
import { PluginType, BrowserToolInitConfig, BrowserToolRunArgs, BrowserToolExpose } from "../../types";
import puppeteer, { Browser } from "puppeteer";


export default class BrowserToolPlugin
  implements Plugin<BrowserToolInitConfig, BrowserToolRunArgs, BrowserToolExpose, any> {
  
  name = "browserTool";
  description = "Web Browser plugin (headless) ile sayfa açma, etkileşime geçme ve veri çekme.";
  type = PluginType.Tool;
  RunConfigExample:BrowserToolRunArgs={
    url: "",
    selector:"", 
    action:"click",
    input:"",
    evaluate: ""
  }
  InitConfigExample: BrowserToolInitConfig = {
    headless: true,
    defaultViewport: { width: 1280, height: 720 },
  };

  private browser:BrowserToolExpose["browser"]= null;

  expose(): BrowserToolExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      browser: this.browser,
    };
  }

  async init(config: BrowserToolInitConfig) {
    const { headless = true, defaultViewport } = config;
    this.browser = await puppeteer.launch({
      headless,
      defaultViewport,
    });
  }

  async run(args: BrowserToolRunArgs): Promise<any> {
    if (!this.browser) {
      throw new Error("Browser is not initialized. Please call init() first.");
    }

    const page = await this.browser.newPage();
    try {
      // Sayfaya git
      await page.goto(args.url, { waitUntil: "networkidle2" });

      // Seçici varsa bekle, bir aksiyon yap
      if (args.selector) {
        await page.waitForSelector(args.selector);

        // Örnek aksiyonlar
        if (args.action === "click") {
          await page.click(args.selector);
        } else if (args.action === "type" && args.input) {
          // Metin girişi yapılacaksa
          await page.type(args.selector, args.input);
        }
      }

      // Kullanıcı `evaluate` ile bir JS fonksiyonu çalıştırmak isteyebilir
      if (args.evaluate) {
        const result = await page.evaluate(args.evaluate);
        return { evaluated: result };
      }

      // Aksi durumda sayfa içeriğini döndürelim
      const content = await page.content();
      return { content };
    } catch (err: any) {
      return { error: err.message || String(err) };
    } finally {
      await page.close();
    }
  
  }
}