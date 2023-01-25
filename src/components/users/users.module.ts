import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema, collection: User.collection},
    ])
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {

}