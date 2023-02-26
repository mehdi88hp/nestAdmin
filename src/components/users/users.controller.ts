import { Body, Controller, Post, All, Session, Param } from "@nestjs/common";
import { SignupDto } from "src/components/users/dto/signup.dto";
import { AuthService } from "src/components/users/services/auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "src/components/users/schemas/user.schema";

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
  getMe(@CurrentUser() user: User) {
    return user;
  }
}