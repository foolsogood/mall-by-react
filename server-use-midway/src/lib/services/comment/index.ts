import { inject, provide } from "midway";
import { IOssService } from "@services/oss/upload";

import { IUserModel } from "../../models/user";

import { ICommentModel } from "../../models/comment";
import { IInsertComment } from "./interface";

export interface ICommentService extends CommentService {}

@provide()
export class CommentService {
  @inject()
  private UserModel!: IUserModel;
  @inject()
  private CommentModel!: ICommentModel;
  @inject()
  ossService: IOssService;
  @inject()
  ctx;
  async list(goodId: string) {
    return await this.CommentModel.findAndCountAll({
      where: {
        goodId: goodId
      }
    });
  }

  async add(goodId: string, data: IInsertComment) {
    const { userId } = this.ctx;
    const { rateScore, comment, isAnonymous,imgList } = data;
    const payload: any = {
      goodId,
      comment,
      imgList,
      rateScore
    };
    if (isAnonymous===1) {
      payload.name = "火星用户";
    } else {
      const u = await this.UserModel.findOne({
        raw: true,
        where: {
          userId
        }
      });
      payload.name = u.username;
      payload.avatar = u.avatar;
    }
    return await this.CommentModel.create(payload);
  }

  async del(commentId: string) {
    return await this.CommentModel.destroy({
      where: {
        commentId: commentId
      }
    });
  }
}
