import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import mongoose, { Model } from "mongoose";
import { SignupDto } from "../dto/signup.dto";

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

  async create(request: SignupDto, password: string) {
    try {
      const mongooseResult = await this.usersModel.create({
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        password
      })
      console.log(mongooseResult)

      return mongooseResult;

    } catch (e) {
      console.log(Object.keys(e))
      console.log(e.toString())
      throw e;
    }

  }

  async setProfile(user, request) {
    // console.log(request, 324234)
    const users = await this.usersModel.findOneAndUpdate(
      {_id: new mongoose.Types.ObjectId(user.id)},
      {
        $set: {
          firstName: request.firstName,
          lastName: request.lastName,
          country: request.country,
          age: request.age,
        }
      },
      {upsert: true}
    ).exec()

    return 'ok'
  }


}