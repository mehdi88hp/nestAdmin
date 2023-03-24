import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwt } from '../enums/constants.enum';
import { Request as RequestType } from 'express';

// import fromExtractors = ExtractJwt.fromExtractors;
// import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // function cookieExtractor(req) {
    //   var token = null;
    //   if (req && req.cookies)
    //   {
    //     token = req.signedCookies['jwt'];
    //   }
    //   return token;
    // };

    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()]),
      /*      jwtFromRequest:ExtractJwt.fromExtractors([(request:any) => {
              let data = request?.cookies["auth-cookie"];
              if(!data){
                return null;
              }
              return data.token
            }]),*/
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  // async validate(payload: any) {
  //   // console.log(payload)
  //   return {sub: payload.sub, username: payload.username};
  // }

  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  private static extractJWT(req: RequestType): string | null {
    // console.log(req.cookies,96969669)
    if (
      req.cookies &&
      'auth-cookie' in req.cookies &&
      req.cookies['auth-cookie'].length > 0
    ) {
      return req.cookies['auth-cookie'];
    } else {
      console.log('not okkkkkkkkkkkkkkkkkk', req.cookies)
    }
    return null;
  }

}