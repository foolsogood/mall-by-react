import { inject, provide, plugin } from "midway";
import { IUserModel } from "../../models/user";
import { ITokenService } from "../token/index";
import { IRegister, ILogin } from "./interface";
import { IOssService } from "@services/oss/upload";
import { IUploadList } from "@services/oss/interface";
const sha1 = require("sha1");
export interface IUserService extends UserService {}

@provide()
export class UserService {
  @inject()
  private UserModel!: IUserModel;

  @inject()
  private tokenService: ITokenService;
  @inject()
  ossService: IOssService;
  @inject()
  ctx;
  @plugin()
  redis;
  async login(data: ILogin) {
    const { phone, password } = data;
    const u = await this.UserModel.findOne({
      raw: true,
      where: {
        phone
      }
    });
    if (!u) {
      return {
        code: -1,
        data: "用户不存在"
      };
    }
    if (sha1(password) === u.password) {
      const { userId } = u;
      const token = await this.tokenService.genToken(userId);
      // console.log(this.redis)
      await this.redis.hset("userId_token_table", userId, token);
      return {
        ...u,
        token
      };
    }
  }

  async register(data: IRegister) {
    console.log(data);
    const { username, password, phone } = data;
    const isExistUser = await this.UserModel.findOne({
      where: {
        phone
      }
    });
    if (!isExistUser) {
      return await this.UserModel.create({
        username,
        phone,
        password: sha1(password)
      });
    }
    return {
      code: -1,
      data: "该手机已注册"
    };
  }
  async uploadAvatar() {
    function isString(data): data is string {
      return typeof data === "string";
    }
    function isIUploadList(data): data is IUploadList {
      return data.every(item => item.name && item.url);
    }
    let uploadRes: IUploadList | string;
    uploadRes = await this.ossService.upload();
    if (isString(uploadRes)) {
      return uploadRes;
    }
    if (isIUploadList(uploadRes)) {
      const { userId } = this.ctx;
      await this.UserModel.update(
        {
          avatar: uploadRes[0].url
        },
        {
          where: {
            userId
          }
        }
      );
      return {
        userId,
        urlList: uploadRes
      };
    }
  }
  async del(userId: string) {
    return await this.UserModel.destroy({
      where: {
        userId: userId
      }
    });
  }
}
