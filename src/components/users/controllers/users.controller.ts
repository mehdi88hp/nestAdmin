import { Body, Controller, Post, All, Session, Param, UseGuards, Request } from "@nestjs/common";
import { SignupDto } from "../dto/signup.dto";
import { AuthService } from "../services/auth.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "../schemas/user.schema";
import { AuthGuard as LocalAuthGuard } from "../guards/auth.guard";
import { CheckPermissions } from "src/components/users/decorators/check-permissions.decorator";
import { PermissionAction } from "src/components/users/services/casl-ability-factory.service";
import { PermissionsGuard } from "src/components/users/guards/permission.guard";
import { PassportLocalAuthGuard } from "../guards/passport-local-auth.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

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
    const user = await this.authService.signUp(request)
    session.userId = user._id;

    return {
      message: 'successful request',
      status: true
    };
  }

  @All('signin')
  @UseGuards(PassportLocalAuthGuard)
  async signin(@Body() request: SignupDto, @Session() session: any) {
    const user = await this.authService.signIn(request.email, request.password);

    console.log(user, user._id)

    session.userId = user._id;

    return user;
  }

  @All('jwtSignIn')
  @UseGuards(PassportLocalAuthGuard)
  async jwtSignin(@Request() req) {
    const user = await this.authService.jwtSignIn(req.user);

    // console.log(user, user._id)
    //
    // session.userId = user._id;

    return user;
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

  @All('test')
  @UseGuards(PassportLocalAuthGuard)
  test(@Request() request) {
    return request.user;
  }

  @All('profile')
  @UseGuards(JwtAuthGuard)
  // @CheckPermissions([PermissionAction.CREATE, "airport"]) // "Invoice" is the value in name column of objects table
  getProfile(@CurrentUser() user: User) {
    console.log(user)
    return user;
  }


  @All('setRoleId')
  @UseGuards(LocalAuthGuard)
  setRoleId(@CurrentUser() user: User, @Body() request) {
    return this.authService.setRoleId(user._id, request.roleId);
  }
}