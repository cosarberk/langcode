import { Plugin } from "../../types";
import { PluginType, CsvLoaderInitConfig, CsvLoaderRunArgs, CsvLoaderExpose } from "../../types";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";


export default class CsvLoaderPlugin
  implements Plugin<CsvLoaderInitConfig, CsvLoaderRunArgs, CsvLoaderExpose, any> {
  
  name = "csvLoader";
  description = "Loads content from a CSV file.";
  type = PluginType.Loader;
  RunConfigExample:CsvLoaderRunArgs={

  }
  InitConfigExample: CsvLoaderInitConfig = {
    path: "./example.csv",
  };

  private loader:CsvLoaderExpose["loader"]  = null;

  expose(): CsvLoaderExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      loader: this.loader,
    };
  }

  async init(config: CsvLoaderInitConfig) {
    this.loader = new CSVLoader(config.path);
  }

  async run(args: CsvLoaderRunArgs): Promise<any> {
    if (!this.loader) throw new Error("CSVLoader is not initialized.");
    const docs = await this.loader.load();
    return docs.map((d) => d.pageContent).join("\n");
  }
}