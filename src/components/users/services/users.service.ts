import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  find() {
    // this.repo.find()
  }

  findOne() {
    // this.repo.findOne(id)
  }

  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {
    //
  }

  async create(email: string, password: string) {
    const mongooseResult = await this.usersModel.create({
      email,
      password
    })
    return mongooseResult;

    console.log(mongooseResult)
  }
}