import mongoose, { Schema, Types } from "mongoose";
import { IPaymentDocument } from "../../interfaces/paymentInterfaces";
const paymentSchema = new Schema<IPaymentDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: function (){
        return this.type === 'subscription'
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["subscription", "trainer"],
      required: true,
    },
    subscriptionId: {
      type: Types.ObjectId,
      ref: "Subscription",
      required: function () {
        return this.type === "subscription";
      },
    },
    trainerId: {
      type: Types.ObjectId,
      ref: "Trainer",
      required: function () {
        return this.type === "trainer";
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model<IPaymentDocument>("Payment", paymentSchema);
