import {Validate} from "class-validator";
import {UserEmailExists} from "../../../general/validations/UserEmailExists";

export class SetProfileDto {
  @Validate(UserEmailExists)

  email: string;

  firstName: string;

  lastName: string;

  country: string;

  age: number;
}