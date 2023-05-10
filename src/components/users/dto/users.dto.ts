import { Allow, Validate } from "class-validator";
import { Type } from "class-transformer";
import { CustomEmailValidation } from "src/components/users/rules/custom-email-validation";

export class usersListDto {

  @Allow()
  readonly filters: any = {};

  // @Allow()
  @Type(() => Number)
  readonly page: number = 1;

  // @Allow()
  @Type(() => Number)
  readonly pageSize: number = 3;

}

export class SetUserDetail {
  @Allow()
  email: string;

  userId: string;

  firstName: string;

  lastName: string;

  country: string;

  age: number;
}