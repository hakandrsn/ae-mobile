export interface SubscribeDto {
  amount: number;
}

export interface CreditPlan {
  key: string;
  name: string;
  credits: number;
  amount: number;
  currency: string;
  shopierUrl: string;
}
