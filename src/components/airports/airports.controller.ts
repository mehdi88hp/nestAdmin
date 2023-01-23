import { Controller, HttpCode, Get } from "@nestjs/common";
import { AirportsService } from "./services/airports.service";


@Controller('/airports')
export class AirportsController {
  constructor(
    protected airportsService: AirportsService
  ) {
    //
  }


  @Get('/ss')
  @HttpCode(200)
  async test() {
    return this.airportsService.test()
  }
}
