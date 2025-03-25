

import mongoose, { Schema, Document, Types } from "mongoose";
import { IAdminModel } from "./IAdminModel";;

interface IAdminDocument extends IAdminModel, Document {}

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
