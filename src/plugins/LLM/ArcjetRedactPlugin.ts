import { PluginInterface } from "@/types";
import { ArcjetRedact, ArcjetSensitiveInfoType } from "@langchain/community/llms/arcjet";

export class ArcjetRedactPlugin implements PluginInterface {
  name = "ArcjetRedact";
  private model!: ArcjetRedact<undefined, ArcjetSensitiveInfoType>;

  constructor(
    private baseLLM: any,
    private entities: ArcjetSensitiveInfoType[] = ["email", "phone-number", "ip-address", "credit-card-number"],
    private contextWindowSize: number = 3,
    private detect?: (tokens: string[]) => (string | undefined)[],
    private replace?: (identifiedType: string) => string | undefined
  ) {}

  setBaseLLM(llm: PluginInterface) {
    this.baseLLM = llm;
  }

  async initialize() {
    if (!this.baseLLM) {
        throw new Error("🚨 ArcjetRedact çalıştırılmadan önce bir LLM atanmalıdır!");
      }
    this.model = new ArcjetRedact<undefined, ArcjetSensitiveInfoType>({
      llm: this.baseLLM,
      entities: this.entities,
      contextWindowSize: this.contextWindowSize,
      detect: this.detect
        ? (this.detect as any)
        : (tokens: string[]) => tokens.map((t) => t.match(/\d{16}/) ? "credit-card" : undefined),
      replace: this.replace
        ? (this.replace as any)
        : (identifiedType: ArcjetSensitiveInfoType) => (identifiedType === "credit-card-number" ? "****-****-****-****" : undefined),
    });

    console.log("🛡️ Arcjet Redact modeli başlatıldı.");
  }

  async execute(prompt: string): Promise<string> {
    return await this.model.invoke(prompt);
  }
}