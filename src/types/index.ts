export interface PluginInterface {
    name: string;
    initialize(): Promise<void>;  // Async başlatma
    execute?(...args: any[]): Promise<any>; // Opsiyonel çalışma fonksiyonu
  }