

import { PluginManager } from "./manager/PluginManager";
import { resolve } from "path";
const projectRoot = resolve(__dirname, "..");
console.log("Proje Kök Dizini:", projectRoot);


(async () => {
  const manager = new PluginManager();

  // JSON'dan pluginleri yükle
  await manager.loadFromJSON("./plugins.json");

 // console.log("🔌 Yüklü Pluginler:", manager.listPlugins());

 // OpenAI ile bir sorgu yap
//   const llmResponse = await manager.run("OpenAI", "Türkiyenin başkenti neresidir?");
//   console.log("🤖 OpenAI Yanıtı:", llmResponse);


 // OpenAI ile bir embeding yap
//   const embendingResponse = await manager.run("OpenAIEmbeddings", "hello world");
//   console.log("🤖 OpenAI embeding Yanıtı:", embendingResponse);


 // OpenAI ile bir pdf özetle

//   const PDFResponse = await manager.run("PDFLoader", "./pdf.pdf");
//   console.log("🤖 PDF içeriği:", PDFResponse);

//   const pdftotext=PDFResponse.map((doc:any) => doc.pageContent).join("\n\n");
// const userCommand = "Bu PDF'nin konusunu açıkla."
//   const llmPDFResponse = await manager.run("OpenAI", `Bu bir PDF belgesi:\n\n${pdftotext}\n\n${userCommand}`);
//   console.log("🤖 OpenAI PDF konusu Yanıtı:", llmPDFResponse);


 // duckduckgo ile bir arama yap
//   const DuckDuckGoSearchResponse = await manager.run("DuckDuckGoSearch", "Türkiyenin başkenti neresidir?");
//   console.log("🤖 DuckDuckGoSearch Yanıtı:", JSON.parse(DuckDuckGoSearchResponse));


// send mail
// const response = await manager.run("Mailler", {
//     to: "info@relteco.com",
//     subject: "Test Mail",
//     text: "Bu bir test mailidir!",
//   });

//   console.log(response)

})();