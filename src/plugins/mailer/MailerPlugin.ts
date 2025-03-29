import nodemailer, { Transporter } from "nodemailer";
import { MailerInitConfig, MailerRunArgs,Plugin } from "../../types";



export default class MailerPlugin
  implements Plugin<MailerInitConfig, MailerRunArgs, string>
{
  name = "mailer";
  description = "SMTP email sender using nodemailer.";
  static exampleConfig = {
    host: "mail.domain.com",
    port: 587,
    secure: false,
    auth: {
      user: "your@mail.com",
      pass: "password....",
    },
  };
  private transporter: Transporter | null = null;
  private fromEmail: string | null = null;

  async init(config: MailerInitConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure ?? false,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });

    this.fromEmail = config.auth.user;

    await this.transporter.verify();
  }

  async run(args: MailerRunArgs): Promise<string> {
    if (!this.transporter || !this.fromEmail) {
      throw new Error("Mailer plugin is not initialized.");
    }

    const info = await this.transporter.sendMail({
      from: this.fromEmail,
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      attachments: args.attachments,
    });

    return `📬 Email sent: ${info.messageId}`;
  }
}


