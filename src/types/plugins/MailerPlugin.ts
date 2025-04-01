import { Transporter } from "nodemailer";
import { PluginDescriptions } from "./plugin";

export type MailerInitConfig = {
  host: string;
  port: number;
  secure?: boolean; // true for 465, false for 587
  auth: {
    user: string;
    pass: string;
  };
};

export type MailerRunArgs = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
};

export interface MailerExpose extends PluginDescriptions{
  transporter: Transporter | null ,
  fromEmail: string | null
}


  export const MailerPluginTypes = {
    runArgs: {} as MailerRunArgs,
    return: "" as string,
    expose:{} as MailerExpose
  };