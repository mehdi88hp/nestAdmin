import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    console.log(101, request.user, 4400)
    console.log(11, request.session, 44)
    return request.user
  })