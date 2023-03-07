import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "../schemas/role.schema";
import mongoose, { Model } from "mongoose";


@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private rolesModel: Model<RoleDocument>,
  ) {
  }

  async store(title: string, description: string) {
    const result = await this.rolesModel.create({
      title,
      description
    })

    // console.log(mongooseResult);

    return result;
  }

  async show(title: string) {
    const role = await this.rolesModel.aggregate([
      {
        $match: {title: title}
      }
    ]).exec();

    console.log(role);
    return role
  }

  async updatePermissions(roleId, permissions: string[]) {
    const roles = await this.rolesModel.findOneAndUpdate(
      {_id: new mongoose.Types.ObjectId(roleId)},
      {$set: {permissions: permissions.map(item => new mongoose.Types.ObjectId(item))}},
      {upsert: true}
    ).exec()

    console.log(roles);

    return permissions;
  }

}