import { PluginInterface } from "@/types";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";


export class PDFLoaderPlugin implements PluginInterface {
  name = "PDFLoader";
  private model!: PDFLoader;

  constructor(private config: object) {}

  async initialize() {
    // this.model = new PDFLoader(this.config);
    console.log("🤖 PDFLoader modeli başlatıldı.");
  }

  async execute(filepath:string): Promise<Document[]> {
    const loader = new PDFLoader(filepath);
    return  await loader.load();
  }
}