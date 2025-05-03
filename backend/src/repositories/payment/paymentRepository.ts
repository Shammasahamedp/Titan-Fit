import { IPayment } from "../../models/payments/IpaymentModel";
import { IPaymentRepository } from "./IpaymentRepository";
import { BaseRepository } from "../baseRepository";
import { IPaymentDocument } from "../../interfaces/paymentInterfaces";
import { Payment } from "../../models/payments/paymentModel";
export class PaymentRepository extends BaseRepository<IPaymentDocument>  implements IPaymentRepository{
    constructor(){
        super(Payment)
    }
    // async create(payment: Partial<IPayment>): Promise<IPayment> {
    //     return await Payment.create(payment)
    // }
}