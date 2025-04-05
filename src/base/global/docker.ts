import { exec } from "child_process";
import { promisify } from "util";
import { Logger ,logger, LoggerArgs} from "../../core";
const execAsync = promisify(exec);



/**
 * Utility class for executing frequently used Docker commands.
 */
export class DockerFastCommands {

  private logger: Logger;

  constructor(loggerArgs?: LoggerArgs) {
    this.logger = logger(loggerArgs);
  }
  /**
   * Lists all Docker containers. (`docker ps -a`)
   * @returns A list of all containers (running and stopped).
   */
  async dockerPs(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker ps -a");
    const result = await this.exec("docker ps -a");
    this.logger?.log("✅ Command executed: docker ps -a");
    return result;
  }

  /**
   * Lists all Docker images. (`docker images`)
   * @returns A list of all Docker images on the system.
   */
  async dockerImages(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker images");
    const result = await this.exec("docker images");
    this.logger?.log("✅ Command executed: docker images");
    return result;
  }

  /**
   * Shows resource usage statistics for containers. (`docker stats --no-stream`)
   * @returns Real-time statistics of container CPU, memory, and I/O usage.
   */
  async dockerStats(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker stats --no-stream");
    const result = await this.exec("docker stats --no-stream");
    this.logger?.log("✅ Command executed: docker stats --no-stream");
    return result;
  }

  /**
   * Displays detailed Docker system information. (`docker info`)
   * @returns System-wide Docker configuration and usage info.
   */
  async dockerInfo(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker info");
    const result = await this.exec("docker info");
    this.logger?.log("✅ Command executed: docker info");
    return result;
  }

  /**
   * Lists all Docker networks. (`docker network ls`)
   * @returns A list of all Docker-defined networks.
   */
  async dockerNetworks(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker network ls");
    const result = await this.exec("docker network ls");
    this.logger?.log("✅ Command executed: docker network ls");
    return result;
  }

  /**
   * Lists all Docker volumes. (`docker volume ls`)
   * @returns A list of all Docker volumes.
   */
  async dockerVolumes(): Promise<string> {
    this.logger?.log("ℹ️ Running command: docker volume ls");
    const result = await this.exec("docker volume ls");
    this.logger?.log("✅ Command executed: docker volume ls");
    return result;
  }

  /**
   * Internal helper to execute a shell command.
   * @param cmd The command to be executed.
   * @returns The trimmed stdout output from the command.
   */
  private async exec(cmd: string): Promise<string> {
    const { stdout } = await execAsync(cmd);
    return stdout.trim();
  }
}