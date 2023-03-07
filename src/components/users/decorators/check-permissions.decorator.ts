import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { PermissionAction } from "src/components/users/services/casl-ability-factory.service";
// action, object
export type RequiredPermission = [PermissionAction, string]
export const PERMISSION_CHECKER_KEY = "permission_checker_params_key";

export const CheckPermissions = (...params: RequiredPermission[]): CustomDecorator<string> => {
  return SetMetadata(PERMISSION_CHECKER_KEY, params);
}
