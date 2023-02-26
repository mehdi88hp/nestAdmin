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

    const {userId} = request.session;

    if (userId) {
      const user = await this.authService.getMe(userId);
      request.user = user;
    }
    // else {
    //   const user = await this.authService.signIn(request.email, request.password);
    // }


    return next
      .handle();
  }
}