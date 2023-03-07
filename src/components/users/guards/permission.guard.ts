import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { CaslAbilityFactory, PermissionAction } from "../services/casl-ability-factory.service";
import { AuthService } from "src/components/users/services/auth.service";
// action, object
// export type RequiredPermission = [PermissionAction, PermissionObjectType]
export const PERMISSION_CHECKER_KEY = "permission_checker_params_key";
export const CheckPermissions = (...params): CustomDecorator<string> =>
  SetMetadata(PERMISSION_CHECKER_KEY, params);


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private abilityFactory: CaslAbilityFactory) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get(PERMISSION_CHECKER_KEY, context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();

    const user = request.user || await this.authService.getMe(request.session.userId);

    const ability = await this.abilityFactory.createForUser(user);

    return requiredPermissions.every(permission => {
      return this.isAllowed(ability, permission)
    });
  }

  private isAllowed(ability, permission): boolean {
    return ability.can(...permission);
  }
}
