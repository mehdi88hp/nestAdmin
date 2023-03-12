import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from "src/components/users/services/auth.service";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    public authService: AuthService
  ) {
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before...');

    const request = context.switchToHttp().getRequest();

    // const {userId} = request.session;
    // console.log(484884, request.user, 48484)

    if (request.user
      && !request.user.password // it's because when we login and go through (PassportLocalAuthGuard) we get the whole user not just the token so we do not need to get user again
    ) {
      // console.log('request.user', request.user)
      // const user = await this.authService.getMeById(request.user.userId);
      const user = await this.authService.getMeByEmail(request.user.username);

      request.user = user;
    }
    // else {
    //   const user = await this.authService.signIn(request.email, request.password);
    // }


    return next
      .handle();
  }
}