
export interface ICreatePaymentDTO {
    userId: string;
    amount: number;
    subscriptionId?: string; // if user is subscribing
    trainerId?: string;      // if admin pays trainer
    purpose: 'subscription' | 'trainer';
  }
  
  export interface IPaymentService {
    createPaymentIntent(data: ICreatePaymentDTO): Promise<{ clientSecret: string }>;
    handleWebhook(event: any): Promise<void>;
  }
  