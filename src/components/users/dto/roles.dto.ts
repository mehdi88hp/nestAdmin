export class MakeRolesDto {
  title: string;

  description?: string;
}

export class AddPermissionsDto {
  roleId: string;

  permissions: string[];
}