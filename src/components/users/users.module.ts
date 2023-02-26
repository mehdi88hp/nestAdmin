import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./interceptors/auth.interceptors";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema, collection: User.collection},
    ])
  ],
  providers: [UsersService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {

}