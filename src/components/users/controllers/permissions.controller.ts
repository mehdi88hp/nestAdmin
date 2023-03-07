import { All, Body, Controller } from "@nestjs/common";
import { MakePermissionsDto } from "../dto/permissions.dto";
import { PermissionService } from "../services/permission.service";
import { CurrentUser } from "src/components/users/decorators/current-user.decorator";
import { User } from "src/components/users/schemas/user.schema";

@Controller('permissions')
export class PermissionsController {
  constructor(
    public permissionService: PermissionService
  ) {
  }

  @All('store')
  async signup(@Body() request: MakePermissionsDto) {
    console.log(request)
    const permission = await this.permissionService.store(request.title, request.description)

    return 'successful request';
  }

  @All('show')
  async show(@Body() request: MakePermissionsDto) {
    console.log(request)
    const permission = await this.permissionService.show(request.title)

    return permission;
  }

  @All('all')
  async all(
    @CurrentUser() user: User,
    @Body() request: MakePermissionsDto
  ) {
    const permission = await this.permissionService.findAllPermissionsOfUser(user)
    console.log(permission, 32)

    return permission;
  }
}