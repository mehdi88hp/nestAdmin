import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import DatabaseConfig from './database.config';
import GeneralConfig from './general.config';


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        DatabaseConfig,
        GeneralConfig,
      ],
    }),
  ],
  controllers: [],
  providers: [],
})

export class ConfigModule {
  //
}
