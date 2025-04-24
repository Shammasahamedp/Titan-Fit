import { IPayment } from "../../models/payments/IpaymentModel";

export interface IPaymentRepository{
    create(payment:Partial<IPayment>):Promise<IPayment>
}