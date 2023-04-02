import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';

// import { ConfigService } from '@nestjs/config';
// const cookieSession = require('cookie-session')
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const cors = require('cors');
const {createClient} = require("redis")
let redisClient = createClient({
  // redis[s]://[[username][:password]@][host][:port][/db-number] See redis and
  url: "redis://cache:6379",
  legacyMode: true,

})
redisClient.connect().catch(console.error);


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*    app.use(cookieSession({
          keys: ['asdasdqwd']
      }));

  app.use(session({
    keys: ['asdasdqwd']
  }));*/

  app.use(
    session({
      store: new RedisStore({client: redisClient}),
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  )
  app.enableCors({
    origin: [
      'http://ui.eng.local',
    ],
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


  //define useContainer in main.ts file
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(cookieParser());


  await app.listen(3101);
}

bootstrap();
