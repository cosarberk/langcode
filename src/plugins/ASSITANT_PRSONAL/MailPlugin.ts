import { PluginInterface } from "@/types";
import nodemailer, { Transporter } from "nodemailer";

export class MaillerPlugin implements PluginInterface {
  name = "Mailler";
  private transporter!: Transporter;

  constructor(private config: { host: string; port: number; secure: boolean; auth: { user: string; pass: string } }) {}

  async initialize() {
    this.transporter = nodemailer.createTransport(this.config);
    console.log("📧 MailPlugin başlatıldı!");
  }

  async execute(mailOptions: { to: string; subject: string; text?: string; html?: string }): Promise<string> {
    try {
      const info = await this.transporter.sendMail({
        from: this.config.auth.user,
        ...mailOptions,
      });

      return `📩 Mail gönderildi: ${info.messageId}`;
    } catch (error) {
      console.error("🚨 Mail gönderme hatası:", error);
      return "❌ Mail gönderilemedi!";
    }
  }
}