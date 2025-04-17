import { DockerFastCommands } from "../../base";
import { Plugin } from "../../types";
import { PluginType, DockerInitConfig, DockerRunArgs, DockerExpose } from "../../types";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default class DockerPlugin
  implements Plugin<DockerInitConfig, DockerRunArgs, DockerExpose, any> {
  
  name = "docker";
  description = "Runs secure Docker commands like docker run, docker exec.";
  type = PluginType.LangCodeTool;
  RunConfigExample:DockerRunArgs={
    command: "",
    timeout:0,
    env: {}
  }
  InitConfigExample: DockerInitConfig = {
    safeMode: true,
    defaultTimeout: 10000,
    workingDir: process.cwd()
  };


  private safeMode: DockerExpose["safeMode"] = true;
  private defaultTimeout: DockerExpose["defaultTimeout"] = 10000;
  private workingDir: DockerExpose["workingDir"] = process.cwd();
  private unsafeCommands: DockerExpose["unsafeCommands"] = ["rm", "reboot", "shutdown", "--privileged", "--mount", "-v", "--volume"];
  private allowedDockerCommands: DockerExpose["allowedDockerCommands"] = [
    "docker run",
    "docker exec",
    "docker ps",
    "docker images",
    "docker build",
    "docker pull",
    "docker push",
    "docker stop",
    "docker start",
    "docker restart",
    "docker kill",
    "docker rm",
    "docker rmi",
    "docker logs",
    "docker inspect",
    "docker volume",
    "docker network",
    "docker tag",
    "docker save",
    "docker load",
    "docker login",
    "docker logout",
    "docker info",
    "docker stats",
    "docker version",
    "docker compose",
    "docker context",
    "docker cp",
    "docker diff",
    "docker system",
    "docker history",
    "docker port",
    "docker events",
    "docker wait",
    "docker top",
    "docker update",
    "docker attach",
    "docker rename",
    "docker export",
    "docker import"
  ];
  private dfc: DockerFastCommands = new DockerFastCommands({debug:true});


  expose(): DockerExpose {
    return {
      name: this.name,
      description: this.description,
      type: this.type,
      InitConfigExample: this.InitConfigExample,
      RunConfigExample:this.RunConfigExample,
      safeMode: this.safeMode,
      defaultTimeout: this.defaultTimeout,
      workingDir: this.workingDir,
      unsafeCommands: this.unsafeCommands,
      allowedDockerCommands: this.allowedDockerCommands,
      dfc: this.dfc
    };
  }

  async init(config: DockerInitConfig) {
    this.safeMode = config.safeMode ?? true;
    this.defaultTimeout = config.defaultTimeout ?? 10000;
    this.workingDir = config.workingDir ?? process.cwd();
  }

  async run(args: DockerRunArgs): Promise<any> {
    const { command, timeout, env } = args;

    if (!this.allowedDockerCommands.some(cmd => command.startsWith(cmd))) {
      return { error: "⛔️ Yalnızca belirli docker komutlarına izin veriliyor." };
    }

    if (this.safeMode && this.unsafeCommands.some(cmd => command.includes(cmd))) {
      return { error: "⚠️ Komut güvenlik nedeniyle engellendi." };
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: timeout ?? this.defaultTimeout,
        cwd: this.workingDir,
        env: { ...process.env, ...env }
      });

      return {
        stdout: stdout.trim(),
        stderr: stderr?.trim() || null
      };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}




