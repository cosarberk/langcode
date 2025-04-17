import { Plugin } from "../../types";
import { PluginType, PdfParserInitConfig, PdfParserRunArgs, PdfParserExpose } from "../../types";
import fs from "fs/promises";
import axios from "axios";
import pdfParse from "pdf-parse";


export default class PdfParserPlugin
  implements Plugin<PdfParserInitConfig, PdfParserRunArgs, PdfParserExpose, any> {
  
  name = "pdfParser";
  description = "PDF dosyalarını (yerel veya uzak) metin ve metadata olarak parse eden plugin.";
  type = PluginType.LangCodeTool;
  RunConfigExample:PdfParserRunArgs={
    filePath:"",
    fileUrl:"",
    parseMetaOnly:false,
    returnBuffer:false
  }
  InitConfigExample: PdfParserInitConfig = {
    parseMetaOnly: false, 
  };

  private parseMetaOnly:PdfParserExpose["parseMetaOnly"]= false;

  expose(): PdfParserExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      parseMetaOnly: this.parseMetaOnly,
      RunConfigExample:this.RunConfigExample,

    };
  }

  async init(config: PdfParserInitConfig) {
    this.parseMetaOnly = config.parseMetaOnly ?? false;
  }

  async run(args: PdfParserRunArgs): Promise<any> {
    const { filePath, fileUrl, returnBuffer, parseMetaOnly } = args;

    // 1) Dosyayı okuma
    let pdfBuffer: Buffer;
    if (filePath) {
      // Yerel dosya
      pdfBuffer = await fs.readFile(filePath);
    } else if (fileUrl) {
      // Uzak dosya
      const resp = await axios.get<ArrayBuffer>(fileUrl, { responseType: "arraybuffer" });
      pdfBuffer = Buffer.from(resp.data);
    } else {
      throw new Error("Lütfen 'filePath' veya 'fileUrl' parametresinden birini belirtin.");
    }

    // 2) PDF'i parse et
    try {
      const parsed = await pdfParse(pdfBuffer);

      // pdf-parse’ın döndürdüğü tipik değerler:
      // { numpages, numrender, info, metadata, version, text, etc. }

      // parseMetaOnly önceliği: eğer run args içinde set edildiyse onu kullan, yoksa init’te gelen config’i kullan
      const shouldParseMetaOnly = parseMetaOnly ?? this.parseMetaOnly;

      if (shouldParseMetaOnly) {
        // Sadece metadata vs. döndür
        return {
          numpages: parsed.numpages,
          info: parsed.info,
          metadata: parsed.metadata,
          version: parsed.version,
        };
      } else {
        // Tam metin + metadataları döndür
        const result: any = {
          text: parsed.text,
          numpages: parsed.numpages,
          info: parsed.info,
          metadata: parsed.metadata,
          version: parsed.version,
        };

        // Kullanıcı isterse PDF’in orijinal buffer’ını da alsın
        if (returnBuffer) {
          result.pdfBuffer = pdfBuffer;
        }

        return result;
      }
    } catch (err: any) {
      throw new Error(`PDF parse işlemi başarısız: ${err.message}`);
    }
  }
}