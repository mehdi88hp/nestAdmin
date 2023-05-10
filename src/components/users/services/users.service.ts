import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import mongoose, { Model } from "mongoose";
import { SignupDto } from "../dto/signup.dto";

@Injectable()
export class UsersService {
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

  async getUsersList(filters, page, pageSize) {
    const users = await this.usersModel.aggregate([
      {
        $facet: {
          data: [
            {$match: {}},
            {$skip: pageSize * (page - 1)},
            {$limit: pageSize},
            {
              $project: {
                id: "$_id",
                email: 1,
                firstName: 1,
                lastName: 1,
              }
            },
          ],
          totalCount: [
            {"$count": "count"},
          ]
        }
      },
      {
        $unwind: {
          path: '$totalCount'
        }
      }, {
        $project: {
          data: 1,
          totalCount: "$totalCount.count",
        }
      }
    ])
      .exec()

    return users[0]
  }

  async getUserDetail(userId) {
    const user = await this.usersModel.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(userId)}
      },
      {
        $lookup: {
          as: 'role',
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          pipeline: [
            {
              $lookup: {
                from: 'permissions',
                foreignField: '_id',
                localField: 'permissions',
                // as: 'newPermissions',
                as: 'permissions',
              }
            }
          ],
        }
      },
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          age: 1,
          country: 1,
          role: {
            title: 1,
            description: 1,
            permissions: {
              title: 1,
              description: 1,
            },
          }
        }
      }
    ]).exec();

    return user.length ? user[0] : null;
  }

  async setUserDetail(request) {
    // console.log(request, 324234)
    const users = await this.usersModel.findOneAndUpdate(
      {_id: new mongoose.Types.ObjectId(request.userId)},
      {
        $set: {
          email: request.email,
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