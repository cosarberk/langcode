import { langcode } from "../core";
import { PluginConfigs, plugins } from "../types";
import { getPlugins, printPlugins } from "../utils";
import chalk from "chalk";
import { Calculator } from "@langchain/community/tools/calculator";


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
    // {
    //   pluginName: plugins.http,
    //   config: {},
    // },
  //   {
  //     pluginName:plugins.mailer,
  //     config:{
  //         "host": "smtp.gmail.com",
  //         "port": 587,
  //         "secure": false,
  //         "auth": {
  //           "user": "lookmainpoint@gmail.com",
  //           "pass": "sikm inta ouch entr"
  //         }
  //   }
  // }
    // {
    //   pluginName:plugins.promptTemplate,
    //   config:{}
    // }
// {
//   pluginName:plugins.agentOpenAI,
//   config: {
//     "apiKey": "sk-...",
//     "model": "gpt-4o",
//     "temperature": 0.7,
//     "tools": [new Calculator()],
//     "messages": [
//       {
//         "role": "system",
//         "content": "Bir assistant gibi davran."
//       },
//       {
//         "role": "user",
//         "content": "{input}"
//       },
//       {
//         "role": "assistant",
//         "content": "{agent_scratchpad}"
//       }
//     ]
//   }
// }
{
  pluginName:plugins.openaiEmbedding,
  config:{
    apiKey:"sk-proj-"
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



  // const response = await manager.run(plugins.mailer,{
  //   to: "info@relteco.com",
  //   subject: "Test Mail",
  //   text: "Bu bir test mailidir!",
  // })


  
  // const result = await manager.run(plugins.promptTemplate,{ template: "Merhaba {name}, bugün nasılsın?",
  //   inputVariables: {
  //     name: "Berk"
  //   }});


  //  console.log("Yanıt:", result);


  // const response = await manager.run(plugins.agentOpenAI,{input: "5 * 9 kaç eder?"})


   const response = await manager.run(plugins.openaiEmbedding,{text:"Merhaba dünya"})




}

main().catch(console.error);