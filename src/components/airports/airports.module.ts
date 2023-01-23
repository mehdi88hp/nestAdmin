import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Airport, AirportSchema } from "./schemas/airport.schema";
import { AirportsController } from "src/components/airports/airports.controller";
import { AirportsService } from "src/components/airports/services/airports.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Airport.name, schema: AirportSchema, collection: Airport.collection},
    ])
  ],
  controllers: [
    AirportsController
  ],
  providers: [
    AirportsService
  ],
  exports: [
    //
  ],
})
export class AirportsModule {
  //
}
