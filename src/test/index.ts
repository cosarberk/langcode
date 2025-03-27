import { langcode } from "../core";
import { plugins } from "../types";
import { getPlugins } from "../utils";

async function main() {


    console.log(await getPlugins())
  const config = [
    {
      pluginName: plugins.openai,
      config: {
        apiKey:  "sk-proj...",
        modelName: "gpt-4o",
        temperature: 0.7,
      },
    },
    {
      pluginName: plugins.dalle,
      config: {
        apiKey:  "sk-proj...",
      },
    },
  ];

  const manager = await langcode(config, {
    debug: true,
    logFile: "./debug/langoce.log"
  });

  // const response = await manager.run(plugins.openai, {
  //   prompt: "Selam, bana fıkra anlatır mısın?",
  // });
  const respose = await manager.run(plugins.dalle,{prompt:"bana 1967 model ford mustang resmi oluştur",outputPath:"output.png"})

  // console.log("Yanıt:", respose);
}

main().catch(console.error);