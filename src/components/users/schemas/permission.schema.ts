import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  static readonly collection = 'permissions';

  // @Prop()
  // _id: mongoose.Schema.Types.ObjectId
  _id: mongoose.Types.ObjectId;


  @Prop({
      type: String,
      unique: true,
      dropDups: true
    }
  )
  title: string;

  @Prop()
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
