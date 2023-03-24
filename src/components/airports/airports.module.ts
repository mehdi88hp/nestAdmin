import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Airport, AirportSchema } from "./schemas/airport.schema";
import { AirportsController } from "src/components/airports/airports.controller";
import { AirportsService } from "src/components/airports/services/airports.service";
import { CookieService } from "src/components/airports/services/cookie.service";


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
    AirportsService,
    CookieService
  ],
  exports: [
    CookieService
  ],
})
export class AirportsModule {
  //
}
