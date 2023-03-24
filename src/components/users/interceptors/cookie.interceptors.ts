import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuthService } from "src/components/users/services/auth.service";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    public authService: AuthService
  ) {
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before...');

    // const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next
      .handle().pipe(tap(()=>{

      }));
  }
}