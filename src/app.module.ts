import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";
import { AirportsModule } from "src/components/airports/airports.module";

@Module({
  imports: [DatabaseModule, ConfigModule,AirportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
