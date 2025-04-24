import { IPayment } from "../../models/payments/IpaymentModel";
import { IPaymentRepository } from "./IpaymentRepository";
import { Payment } from "../../models/payments/paymentModel";
export class PaymentRepository implements IPaymentRepository{
    async create(payment: Partial<IPayment>): Promise<IPayment> {
        return await Payment.create(payment)
    }
}