import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Model, ObjectId } from "mongoose";
import { Role } from "./role.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  static readonly collection = 'users';

  // @Prop()
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

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  country: string;

  @Prop()
  age: number;

  @Prop()
  isAdmin: string;

  @Prop({
    ref: Role.name,
    type: mongoose.Schema.Types.ObjectId
  })
  roleId;
}

export const UserSchema = SchemaFactory.createForClass(User);
