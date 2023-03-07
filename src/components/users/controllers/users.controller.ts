import { Body, Controller, Post, All, Session, Param, UseGuards } from "@nestjs/common";
import { SignupDto } from "../dto/signup.dto";
import { AuthService } from "../services/auth.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "../schemas/user.schema";
import { AuthGuard } from "../guards/auth.guard";
import { CheckPermissions } from "src/components/users/decorators/check-permissions.decorator";
import { PermissionAction } from "src/components/users/services/casl-ability-factory.service";
import { PermissionsGuard } from "src/components/users/guards/permission.guard";

@Controller('users')
export class UsersController {
  constructor(
    public authService: AuthService
  ) {
  }

  @All('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color2 = color;
  }

  @All('/colors')
  getColor(@Session() session: any) {
    return session.color3;
  }

  @All('signup')
  async signup(@Body() request: SignupDto, @Session() session: any) {
    console.log(request)
    const user = await this.authService.signUp(request.email, request.password)
    session.userId = user._id;

    return 'successful request';
  }

  @All('signin')
  async signin(@Body() request: SignupDto, @Session() session: any) {
    const user = await this.authService.signIn(request.email, request.password);

    console.log(user, user._id)

    session.userId = user._id;

    return 'successful request';
  }

  @All('signOut')
  async signOut(@Session() session: any) {
    session.userId = null;

    return 'successful sign out';
  }


  /*  @All('getMe')
    getMe(@Session() session: any) {
      return this.authService.getMe(session.userId)
      return 'successful request';
    }*/

  @All('getMe')
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, "airport"]) // "Invoice" is the value in name column of objects table
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @All('setRoleId')
  @UseGuards(AuthGuard)
  setRoleId(@CurrentUser() user: User, @Body() request) {
    return this.authService.setRoleId(user._id, request.roleId);
  }
}