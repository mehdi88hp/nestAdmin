import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Permission, PermissionDocument } from "../schemas/permission.schema";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Role } from "src/components/users/schemas/role.schema";


@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private permissionsModel: Model<PermissionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  async store(title: string, description: string) {
    const result = await this.permissionsModel.create({
      title,
      description
    })

    // console.log(mongooseResult);

    return result;
  }

  async show(title: string) {
    const permission = await this.permissionsModel.aggregate([
      {
        $match: {title: title}
      }
    ]).exec();

    console.log(permission);
    return permission
  }

  async findAllPermissionsOfUser(user: User): Promise<string[]> {
    const model = await this.userModel.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(user._id)}
      },
      {
        $lookup: {
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
          as: 'newRole'
        }
      }, {
        $unwind: {
          path: '$newRole'
        }
      },
    ]).exec();
    console.log(234, model, user)
    return model.length ? model[0].newRole.permissions.map(i => i.title) : [];
  }

}