import { langcode } from "../core";
import { EmbeddingProviders, OpenAIEmbeddingExpose, PluginConfigs, plugins, VectorStores } from "../types";
import { getPlugins, printPlugins } from "../utils";
import chalk from "chalk";
import { Calculator } from "@langchain/community/tools/calculator";
import { Document } from "@langchain/core/documents";
import {  createFaissStore, loadFaissStore, retrieverBuilder, retrieverCreator, saveFaissStore, summaryMemoryBuilder } from "../base";


async function main() {

  const Allplugins = await printPlugins();
    console.log(Allplugins)
  const config:PluginConfigs[] = [
    {
      pluginName: plugins.openai,
      config: {
        apiKey:  "sk-proj...",
        modelName: "gpt-4o",
        temperature: 0.7,
      },
    },
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
// {
//   pluginName:plugins.openaiEmbedding,
//   config:{
//     apiKey:"sk-...."
//   }
// },
  // {
  //   pluginName:plugins.vectorSearch,
  //   config:{}
  // }

  // {
  //   pluginName:plugins.bufferMemory,
  //   config:{}
  // }

  // {
  //   pluginName:plugins.textLoader,
  //   config:{}
  // }
  // {
  //   pluginName: plugins.calculatorTool,
  //   config: {},
  // },

  // {
  //   pluginName:plugins.duckduckgoPlugin,
  //   config:{}
  // }
  ];


  const manager = await langcode(config, {
     debug: true,
   //  logFile: "./debug/langoce.log"
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


  // const response = await manager.run(plugins.openaiEmbedding,{text:"Merhaba dünya"})



  ///////////////


  // const rawTexts = [
  //   "CREATE TABLE users (id INT, name TEXT);",
  //   "CREATE TABLE orders (id INT, user_id INT, total DECIMAL);",
  //   "SELECT * FROM users WHERE id = 1;",
  // ];
  // const documents = rawTexts.map((text) => new Document({ pageContent: text }));
  // const embeddedVectors = await Promise.all(
  //   rawTexts.map((text) =>
  //     manager.run(plugins.openaiEmbedding, {text:text})
  //   )
  // );
  

  // const OpenAIEmbedding:OpenAIEmbeddingExpose = await manager.getExpose(plugins.openaiEmbedding)


  // if (OpenAIEmbedding.embeddingModel) {
  //   const storeCreated = await createFaissStore({embeddings:OpenAIEmbedding.embeddingModel,documents:documents });
  //   await saveFaissStore({store: storeCreated,path: "./store_embed"});
  //   const store = await loadFaissStore({embeddings:OpenAIEmbedding.embeddingModel,path: "./store_embed"});
  //   const retriever = await retrieverCreator({embeddings:OpenAIEmbedding,store:store,k:1})
  //  // console.log("retriever",retriever,"retriever")
  //   if (retriever) {
  //    const re = await manager.run(plugins.vectorSearch, {retriever:retriever,query:"Kullanıcıya ait siparişleri nasıl alabilirim?"});
  //     console.log(re)
  //   }
  // }

/// OR AUTOMATİK MODE ////
//  docuemnt verilirse save işelmi yapılır eğer yoksa direk load yapılır

//     const retriever = await retrieverBuilder({
//     embedding:{
//       provider:EmbeddingProviders.OpenAI,
//       apiKey:"sk-proj-....."},
//     store:{
//       type:VectorStores.Faiss,indexPath:"./store_embed"},
//     k:1})
//     const re = await manager.run(plugins.vectorSearch, {retriever:retriever, query:"Kullanıcıya ait siparişleri nasıl alabilirim?"});
// console.log(re)



// const memory = await manager.getExpose(plugins.bufferMemory);

// // Mesaj ekle
// await memory.memory?.chatHistory.addUserMessage("Merhaba!");
// await memory.memory?.chatHistory.addAIChatMessage("Selam! Nasılsın?");

// // Şimdi tekrar çalıştır
// const messages = await manager.run(plugins.bufferMemory, {});
// console.log(messages);






// const openai = await manager.getExpose(plugins.openai);
// if (!openai.llm) throw new Error("OpenAI plugin not initialized.");

// const summaryMemory = await summaryMemoryBuilder({
//   llm: openai.llm,
//   memoryKey: "my_summary",
// });

// // LLM üzerinden summary oluştur
// await summaryMemory.saveContext(
//   { input: "Merhaba! Bugün hava çok güzeldi." },
//   { output: "Evet, gerçekten güneşli bir gündü!" }
// );

// await summaryMemory.saveContext(
//   { input: "Parkta arkadaşlarımla yürüyüş yaptım." },
//   { output: "Açık hava yürüyüşleri çok keyiflidir." }
// );

// // Ekstra: geçmişe özel mesaj eklemek istersen
// await summaryMemory.chatHistory.addUserMessage("Bunu sadece geçmişe eklemek için yazıyorum.");
// await summaryMemory.chatHistory.addAIChatMessage("Bu da ona cevap.");

// // Hafızayı oku
// const vars = await summaryMemory.loadMemoryVariables({});
// console.log("\n🧠 Hafıza Özeti:\n");
// console.log(vars.my_summary);




// const result = await manager.run(plugins.calculatorTool, {
//   input: "sqrt(144) + 10 / 2",
// });
// console.log("🧮 Sonuç:", result);


// const result = await manager.run(plugins.duckduckgoPlugin,{query:"mustang"})
// console.log(result)

}

main().catch(console.error);