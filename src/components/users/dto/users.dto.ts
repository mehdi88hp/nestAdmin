import { Allow, Validate } from "class-validator";
import { Type } from "class-transformer";

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