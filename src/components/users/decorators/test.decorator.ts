import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

export const TestDec = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    console.log(context)
    return 'hi htere!'
  })