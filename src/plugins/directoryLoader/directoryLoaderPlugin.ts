import { Plugin } from "../../types";
import { PluginType, DirectoryLoaderInitConfig, DirectoryLoaderRunArgs, DirectoryLoaderExpose } from "../../types";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";


export default class DirectoryLoaderPlugin
  implements Plugin<DirectoryLoaderInitConfig, DirectoryLoaderRunArgs, DirectoryLoaderExpose, any> {
  
  name = "directoryLoader";
  description = "Loads all supported documents in a directory.";
  type = PluginType.Loader;
  RunConfigExample:DirectoryLoaderRunArgs={

  }
  InitConfigExample: DirectoryLoaderInitConfig = {
    directoryPath: "./veriler/",
  };

  private loader:DirectoryLoaderExpose["loader"]= null;

  expose(): DirectoryLoaderExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      loader: this.loader,
    };
  }

  async init(config: DirectoryLoaderInitConfig) {
    this.loader = new DirectoryLoader(config.directoryPath, {
      ".txt": (path) => new TextLoader(path),
      ".md": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path),
      ".pdf": (path) => new PDFLoader(path),
      ".json": (path) => new TextLoader(path),
    });
  }

  async run(args: DirectoryLoaderRunArgs): Promise<any> {
    if (!this.loader) throw new Error("DirectoryLoader not initialized.");
    const docs = await this.loader.load();
    return docs.map((doc) => doc.pageContent).join("\n");
  }
}