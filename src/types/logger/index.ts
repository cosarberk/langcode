export type LogLevel = "info" | "warn" | "error" | "success" | "debug";
export const logLevels = ["info", "warn", "error", "success", "debug"] as const;

export interface LoggerArgs {
  debug?: boolean;
  filePath?: string | null;
  tag?: string | null;
}
