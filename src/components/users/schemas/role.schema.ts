import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Permission } from "./permission.schema";

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  static readonly collection = 'roles';

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

  @Prop({
    ref: Permission.name,
    type: Array<mongoose.Schema.Types.ObjectId>
  })
  permissions;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
