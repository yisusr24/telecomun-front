// subscription-summary.model.ts
export type Estado = 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';
export type TipoPlan = 'INTERNET' | 'PHONE' | 'TV';

export interface SubscriptionSummary {
  subscriptionId: number;
  estado: Estado;
  saldo: number;
  productType: TipoPlan;    // INTERNET | PHONE | TV
  productName: string;
  planName: string;
  monthlyFee: number;
  speedMbps?: number;       // INTERNET

  // TV: en tu payload son strings simples
  addons?: string[];

  // PHONE: estructura anidada (según tu payload)
  consumo?: {
    minutos?: {
      usados?: number | null;
      cuota?: number | null;
      porcentaje?: number | null;
    }
  };

  ultimaActualizacion: string | null;
}
