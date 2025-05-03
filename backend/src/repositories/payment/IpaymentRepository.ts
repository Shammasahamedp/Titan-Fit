import { IPaymentDocument } from "../../interfaces/paymentInterfaces";
import { IPayment } from "../../models/payments/IpaymentModel";
import { IBaseRepository } from "../IbaseRepository";

export interface IPaymentRepository  extends IBaseRepository<IPaymentDocument>{
    // create(payment:Partial<IPayment>):Promise<IPayment>
}