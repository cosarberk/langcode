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


  export const MailerPluginTypes = {
    runArgs: {} as MailerRunArgs,
    return: "" as string,
  };