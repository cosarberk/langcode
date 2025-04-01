import nodemailer, { Transporter } from "nodemailer";
import { MailerExpose, MailerInitConfig, MailerRunArgs,Plugin, PluginType } from "../../types";



export default class MailerPlugin
  implements Plugin<MailerInitConfig, MailerRunArgs,MailerExpose, string>
{
  name = "mailer";
  description = "SMTP email sender using nodemailer.";
  type=PluginType.LangCodeTool
  configExample:MailerInitConfig = {
    host: "mail.domain.com",
    port: 587,
    secure: false,
    auth: {
      user: "your@mail.com",
      pass: "password....",
    },
  };
  private transporter:MailerExpose["transporter"] = null;
  private fromEmail: MailerExpose["fromEmail"] = null;

  expose():MailerExpose {
    return {
      name:this.name,
      description:this.description,
      type:this.type,
      configExample:this.configExample,
      transporter:this.transporter,
      fromEmail:this.fromEmail
    }
  }

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


