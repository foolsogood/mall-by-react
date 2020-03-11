import { inject, provide, plugin } from 'midway'
import { IUserModel } from '../../models/user'
import { ITokenService } from '../token/index'
import { IRegister, ILogin } from './interface'
const sha1 = require('sha1');
export interface IUserService extends UserService { }

@provide()
export class UserService {
    @inject()
    private UserModel!: IUserModel

    @inject()
    private tokenService: ITokenService

    @plugin()
    redis
    async login(data: ILogin) {
        const { phone, password } = data
        const u = await this.UserModel.findOne({
            raw: true,
            where: {
                phone
            }
        });
        console.log('u', u)
        if (!u) {
            return {
                code: -1,
                data: '用户不存在'
            };
        }
        if (sha1(password) === u.password) {
            const { userId } = u
            const token = await this.tokenService.genToken(userId)
            // console.log(this.redis)
            await this.redis.hset('userId_token_table', userId, token)
            return {
                token,
                userId,
            }
        }
    }



    async register(data: IRegister) {
        console.log(data)
        const { username, password, phone } = data
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
            data: '该手机已注册'
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