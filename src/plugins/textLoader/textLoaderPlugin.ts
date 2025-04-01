import { TextLoader } from "langchain/document_loaders/fs/text";
import { Plugin } from "../../types";
import { PluginType, TextLoaderInitConfig, TextLoaderRunArgs, TextLoaderExpose } from "../../types";
export default class TextLoaderPlugin
  implements Plugin<TextLoaderInitConfig, TextLoaderRunArgs, TextLoaderExpose, any> {
  
  name = "textLoader";
  description = "Loads plain text files from the file system.";
  type = PluginType.Loader;

  configExample: TextLoaderInitConfig = {
    path: "./example.txt",
  };

  private  loader: TextLoaderExpose["loader"] = null;

  expose(): TextLoaderExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      configExample: this.configExample,
      loader: this.loader,
    };
  }

  async init(config: TextLoaderInitConfig) {
    this.loader = new TextLoader(config.path);
  }

  async run(args: TextLoaderRunArgs): Promise<any> {
    if (!this.loader) throw new Error("TextLoader is not initialized.");
    const docs = await this.loader.load();
    return docs.map((d) => d.pageContent).join("\n");
  }
}