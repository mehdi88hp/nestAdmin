import { Injectable } from '@nestjs/common';

import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';

import { AuthService } from "../services/auth.service";

@ValidatorConstraint({name: 'email', async: true})
@Injectable()
export class CustomEmailValidation implements ValidatorConstraintInterface {
  constructor(public authService: AuthService) {
  }

  async validate(value: string): Promise<boolean> {
    console.log(value)
    return this.authService.getMeByEmail(value) ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}