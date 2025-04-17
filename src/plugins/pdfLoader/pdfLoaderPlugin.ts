
import { PluginType, PdfLoaderInitConfig, PdfLoaderExpose, PdfLoaderRunArgs, Plugin } from "../../types";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export default class PdfLoaderPlugin
  implements Plugin<PdfLoaderInitConfig, PdfLoaderRunArgs, PdfLoaderExpose, any> {
  
  name = "pdfLoader";
  description = "Loads text content from a PDF file.";
  type = PluginType.Loader;
  RunConfigExample:PdfLoaderRunArgs={

  }
  InitConfigExample: PdfLoaderInitConfig = {
    path: "./example.pdf",
  };

  private loader:PdfLoaderExpose["loader"]= null;

  expose(): PdfLoaderExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      loader: this.loader,
    };
  }

  async init(config: PdfLoaderInitConfig) {
    this.loader = new PDFLoader(config.path);
  }

  async run(args: PdfLoaderRunArgs): Promise<any> {
    if (!this.loader) throw new Error("PDFLoader is not initialized.");
    const docs = await this.loader.load();
    return docs.map((d) => d.pageContent).join("\n");
  }
}