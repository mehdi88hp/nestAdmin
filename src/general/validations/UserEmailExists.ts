import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {Injectable} from "@nestjs/common";
import {AuthService} from "../../components/users/services/auth.service";

@ValidatorConstraint({ name: 'UserEmailExists', async: false })
@Injectable()
export class UserEmailExists implements ValidatorConstraintInterface {
  constructor(private authService: AuthService) {}

  async validate(value: string) {
    console.log('validate uuuu',value)

    // try {
    //   await this.authService.getMeByEmail(value);
      // console.log('okokokokokokokok',value)
    // } catch (e) {
    //   console.log('not ok',e)

      // return false;
    // }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}