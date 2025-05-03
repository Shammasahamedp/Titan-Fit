
export interface ICreatePaymentSessionDTO {
    userId: string;
    subscriptionId?: string; // if user is subscribing
    trainerId?: string;      // if admin pays trainer
    type: 'subscription' | 'trainer';
  }
  
  export interface IPaymentService {
    createCheckoutSession(planId: string,userId:string): Promise<string|undefined>;
    handleWebhook(eventData: any,signature:string): Promise<void>;
    getPaymentSessionDetails(sessionId:string):Promise<void>
  }
  