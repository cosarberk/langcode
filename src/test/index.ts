import { langcode } from "../core";
import { PluginConfigs, plugins } from "../types";
import { getPlugins, printPlugins } from "../utils";
import chalk from "chalk";

async function main() {

  const Allplugins = await printPlugins();
    console.log(Allplugins)
  const config:PluginConfigs[] = [
    // {
    //   pluginName: plugins.openai,
    //   config: {
    //     apiKey:  "sk-proj...",
    //     modelName: "gpt-4o",
    //     temperature: 0.7,
    //   },
    // },
    // {
    //   pluginName: plugins.dalle,
    //   config: {
    //     apiKey:  "sk-proj...",
    //   },
    // },
    {
      pluginName: plugins.http,
      config: {},
    },
    {
      pluginName:plugins.mailer,
      config:{

      }
    }
  ];

  const manager = await langcode(config, {
    debug: true,
    logFile: "./debug/langoce.log"
  });

  // const response = await manager.run(plugins.openai, {
  //   prompt: "Selam, bana fıkra anlatır mısın?",
  // });
  //const respose = await manager.run(plugins.dalle,{prompt:"bana 1967 model ford mustang resmi oluştur",outputPath:"output.png"})


  // const response = await manager.run(plugins.http,{
  //    url: "https://jsonplaceholder.typicode.com/posts/1",
  // method: "GET"
  // })



  const response = await manager.run(plugins.mailer,{
    to: "info@relteco.com",
    subject: "Test Mail",
    text: "Bu bir test mailidir!",
  })


  // console.log("Yanıt:", respose);
}

main().catch(console.error);