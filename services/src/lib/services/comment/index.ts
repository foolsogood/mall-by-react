import { inject, provide } from 'midway'
import { ICommentModel } from '../../models/comment'
import { IInsertComment } from './interface'

export interface ICommentService extends CommentService { }

@provide()
export class CommentService {
    @inject()
    private CommentModel!: ICommentModel

    async list(goodId:  string) {
        return await this.CommentModel.findAndCountAll({
            where: {
                goodId: goodId
            }
        })
    }

    

    async add(data: IInsertComment) {
        console.log(data)
        return await this.CommentModel.create(data);
    }
    async del(commentId:  string) {
        return await this.CommentModel.destroy({
            where: {
                commentId: commentId
            }
        });
    }
}