import { Allow, Validate } from "class-validator";
import { CustomEmailValidation } from "../rules/custom-email-validation";

export class MakePermissionsDto {

  @Allow()
  title: string;

  @Allow()
  description: string;
}