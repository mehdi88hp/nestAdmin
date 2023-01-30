import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from 'util'
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import mongoose, { Model, Schema } from "mongoose";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {
  }

  async signUp(email: string, password: string) {
    //see if email is in use

    //has the users password

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return this.usersService.create(email, result)
  }

  async getMe(userId) {
    console.log(userId)
    const user = await this.usersModel.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(userId)}
      }
    ]).exec();

    return user.length ? user[0] : null;
  }

  async signIn(email, password) {
    const user = await this.usersModel.aggregate([
      {
        $match: {email: email}
      }
    ]).exec();

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    const [salt, storeHash] = user[0].password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash === hash.toString('hex')) {
      return user[0];
    } else {
      throw new BadRequestException('bad password')
    }
  }
}