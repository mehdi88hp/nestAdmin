import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type AirportDocument = Airport & Document;

@Schema()
export class Airport {
  static readonly collection = 'airports';

  _id: mongoose.Types.ObjectId;

  @Prop()
  titleFa: string;

  @Prop()
  titleEn: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
