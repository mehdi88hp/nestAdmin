import { AbilityBuilder, createMongoAbility, } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/components/users/schemas/user.schema";
import { Permission } from "src/components/users/schemas/permission.schema";
import { PermissionService } from "src/components/users/services/permission.service";

export enum PermissionAction {
  MANAGE = "manage",
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}


interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
  ) {
  }

  async createForUser(user: User) {
    const dbPermissions: string[] = await this.permissionService.findAllPermissionsOfUser(user);
    // console.log('its benn hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', dbPermissions)

    /*    const caslPermissions = dbPermissions.map(p => {
          const arr = p.split(' ');

          return {
            action: arr.at(0),
            subject: arr.at(1),
          }
        })
        return new AbilityBuilder(caslPermissions as any);*/

    const ability = new AbilityBuilder(createMongoAbility);

    dbPermissions.map(p => {
      const arr = p.split(' ');
      ability.can(arr.at(0), arr.at(1))
    })

    return ability.build();
  }
}