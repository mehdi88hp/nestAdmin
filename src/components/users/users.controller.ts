import { Body, Controller, Post, All } from "@nestjs/common";
import { SignupDto } from "src/components/users/dto/signup.dto";
import { AuthService } from "src/components/users/services/auth.service";

@Controller('users')
export class UsersController {
  constructor(
    public authService: AuthService
  ) {
  }

  @All('signup')
  signup(@Body() request: SignupDto) {
    console.log(request)
    this.authService.signUp(request.email, request.password)
    return 'successful request';
    /* !!!!!!!!!!!!!!!! complete this method*/
  }
}