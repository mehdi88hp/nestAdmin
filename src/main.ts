import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { ValidationPipe } from "@nestjs/common";

import { ConfigService } from '@nestjs/config';
// const cookieSession = require('cookie-session')
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const cors = require('cors');
const {createClient} = require("redis")


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  let redisClient = createClient({
    // redis[s]://[[username][:password]@][host][:port][/db-number] See redis and
    url: configService.get('general.redisUri'),
    legacyMode: true,

  })
  redisClient.connect().catch(console.error);

  /*    app.use(cookieSession({
          keys: ['asdasdqwd']
      }));

  app.use(session({
    keys: ['asdasdqwd']
  }));*/
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.use(
    session({
      store: new RedisStore({client: redisClient}),
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  )

  console.log(configService.get('general.allowedCorsUrls'))
  app.enableCors({
    origin: configService.get('general.allowedCorsUrls'),
    // methods: ["GET", "POST"],
    methods: ["*"],
    credentials: true,
  });
  // app.use(cors({credentials: true, origin: '*'}));
  // const configService = app.get(ConfigService);
  //
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });

  app.use(cookieParser());
  useContainer(app.select(AppModule), {fallbackOnErrors: true});


  await app.listen(4102);
}

bootstrap();
