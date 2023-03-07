import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { Role, RoleSchema } from "./schemas/role.schema";
import { Permission, PermissionSchema } from "./schemas/permission.schema";
import { UsersController } from "./controllers/users.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./interceptors/auth.interceptors";
import { RolesController } from "./controllers/roles.controller";
import { RoleService } from "./services/role.service";
import { PermissionsController } from "./controllers/permissions.controller";
import { PermissionService } from "./services/permission.service";
import { CaslAbilityFactory } from "./services/casl-ability-factory.service";
import { PermissionsGuard } from "./guards/permission.guard";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema, collection: User.collection},
      {name: Role.name, schema: RoleSchema, collection: Role.collection},
      {name: Permission.name, schema: PermissionSchema, collection: Permission.collection},
    ])
  ],
  providers: [UsersService, AuthService,
    RoleService, PermissionService, PermissionsGuard,
    CaslAbilityFactory,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
  controllers: [UsersController, RolesController, PermissionsController],
  exports: [PermissionsGuard, CaslAbilityFactory],
})
export class UsersModule {

}