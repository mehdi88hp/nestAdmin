import { All, Body, Controller } from "@nestjs/common";
import { MakeRolesDto, AddPermissionsDto } from "../dto/roles.dto";
import { RoleService } from "../services/role.service";

@Controller('roles')
export class RolesController {
  constructor(
    public roleService: RoleService
  ) {
  }

  @All('store')
  async store(@Body() request: MakeRolesDto) {
    console.log(request)
    const role = await this.roleService.store(request.title, request.description)

    return 'successful request';
  }

  @All('show')
  async show(@Body() request: MakeRolesDto) {
    console.log(request)
    const role = await this.roleService.show(request.title)

    return role;
  }

  @All('updatePermissions')
  async updatePermissions(@Body() request: AddPermissionsDto) {
    console.log(request)
    const updatePermissions = await this.roleService.updatePermissions(request.roleId, request.permissions)

    return updatePermissions;
  }
}