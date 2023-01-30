import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import { ConfigService } from '@nestjs/config';
// const cookieSession = require('cookie-session')
const session = require("express-session")
let RedisStore = require("connect-redis")(session)

const {createClient} = require("redis")
let redisClient = createClient({
  // redis[s]://[[username][:password]@][host][:port][/db-number] See redis and
  url: "redis://cache:6379",
  legacyMode: true,

})
redisClient.connect().catch(console.error)

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

  // const configService = app.get(ConfigService);

  await app.listen(4002);
}

bootstrap();
