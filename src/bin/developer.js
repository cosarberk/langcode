#!/usr/bin/env node


const inquirer = require("inquirer");
const chalk = require("chalk");
const { createPlugin }  =require("./plugin")
const { updatePluginName, deletePlugin } = require("./pluginManager");

console.clear();

console.log(chalk.blueBright("\n🛠️  Welcome to LangCode Developer Tools\n"));

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { name: "1️⃣  Create new plugin", value: "create" },
        { name: "2️⃣  Update plugin name", value: "update" },
        { name: "3️⃣  Delete plugin", value: "delete" },
        { name: "4️⃣  Exit", value: "exit" },
      ],
    },
  ]);

  switch (action) {
    case "create":
      const { pluginName:newPluginName } = await inquirer.prompt([
        {
          type: "input",
          name: "pluginName",
          message: "Enter the new plugin name:",
          validate: (input) => input.trim() !== "" || "Name cannot be empty!",
        },
      ]);
      await createPlugin(newPluginName);
      break;

    case "update":
      const { oldName, newName } = await inquirer.prompt([
        {
          type: "input",
          name: "oldName",
          message: "Enter the current plugin name:",
        },
        {
          type: "input",
          name: "newName",
          message: "Enter the new plugin name:",
        },
      ]);
      updatePluginName(oldName, newName);
      break;

    case "delete":
      const { pluginName:deletePluginName } = await inquirer.prompt([
        {
          type: "input",
          name: "pluginName",
          message: "Enter the plugin name to delete:",
        },
      ]);
      deletePlugin(deletePluginName);
      break;

    case "exit":
    default:
      console.log(chalk.green("\n👋 Exiting LangCode Developer Tools. Bye!"));
      process.exit(0);
  }
}

main();
