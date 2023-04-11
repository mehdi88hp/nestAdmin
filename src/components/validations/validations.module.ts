import { Module } from "@nestjs/common";
import { AuthService } from "../users/services/auth.service";


@Module({
  imports: [],
  providers: [
    // AuthService
  ],
  exports: [],
})
export class ValidationsModule {

}