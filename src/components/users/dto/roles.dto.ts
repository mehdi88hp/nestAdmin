import { Allow } from "class-validator";

export class MakeRolesDto {
  @Allow()
  
  title: string;

  description?: string;
}

export class AddPermissionsDto {
  @Allow()

  roleId: string;

  permissions: string[];
}