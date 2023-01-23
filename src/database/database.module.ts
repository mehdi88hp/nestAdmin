import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from "@nestjs/config";
import { MongoDatabaseConfig } from "../config/database.config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => {
        let config = configService.get<MongoDatabaseConfig>('database.mongo');

        return {
          uri: config.uri,
          dbName: config.database,
          user: config.user,
          pass: config.password,
        }
      },
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [],
})

export class DatabaseModule {
}
