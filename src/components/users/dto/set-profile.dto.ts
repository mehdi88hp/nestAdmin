import { Validate } from "class-validator";
import { CustomEmailValidation } from "../rules/custom-email-validation";

export class SetProfileDto {
  @Validate(CustomEmailValidation)
  email: string;

  firstName: string;

  lastName: string;

  country: string;

  age: number;
}