import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  static readonly collection = 'users';

  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop({
      type: String,
      unique: true,
      dropDups: true
    }
  )
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
