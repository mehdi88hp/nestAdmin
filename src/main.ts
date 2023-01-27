import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

// import { ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session')

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieSession({
        keys: ['asdasdqwd']
    }));

    // const configService = app.get(ConfigService);

    await app.listen(3101);
}

bootstrap();
