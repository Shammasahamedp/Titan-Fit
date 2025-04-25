

import mongoose, { Schema, Document, Types } from "mongoose";
import { IAdminDocument } from "../../interfaces/adminInterfaces"; 

const adminSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
   
  },
  { timestamps: true }
);

export const adminModel = mongoose.model<IAdminDocument>(
  "Admin",
  adminSchema
);
