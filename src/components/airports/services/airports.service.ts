import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Airport, AirportDocument } from "../schemas/airport.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AirportsService {
  constructor(
    @InjectModel(Airport.name) private airportsModel: Model<AirportDocument>,
    private configService: ConfigService,
  ) {
    //
  }

  async test() {
    // const schema = new mongoose.Schema({name: 'string', size: 'string'});
    // const Tank = mongoose.model('Tank', schema);
    //
    // const z = new Tank(
    //   {
    //     name: '1',
    //     size: '22'
    //   }
    // )
    // z.save();
    const x = this.airportsModel.create({
      titleFa: '3',
      titleEn: 'qqssss'
    })
  }

}
