import {All, Controller, Get, Request, Res, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {PassportLocalAuthGuard} from "./components/users/guards/passport-local-auth.guard";
import {Response} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tst')
  getHello2(): string {
    return '1212';
  }

  @Get('qq')
  async qq(@Request() req,@Res({ passthrough: true }) response: Response) {
    // const user = await this.authService.jwtSignIn(req.user);
    //
    // const now = new Date();
    //
    console.log(83838383838)
    response.cookie('jwt',
        'asd',{
          domain:'.eng.local',
          httpOnly:true,
          maxAge:9000000
          // maxAge:now.setDate(now.getDate() + 2 * 7)
        });

    // console.log(user, user._id)
    //
    // session.userId = user._id;

    // return user;
  }
}
