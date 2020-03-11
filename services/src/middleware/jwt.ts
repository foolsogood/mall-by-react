import { inject, Middleware, WebMiddleware, provide, plugin } from 'midway'
import { ITokenService } from '../lib/services/token/index'


@provide()
export class JwtMiddleware implements WebMiddleware {
    @inject()
    private tokenService: ITokenService
    @plugin()
    redis
    public resolve(): Middleware {
        return async (ctx, next) => {
            const token = ctx.request.headers.authorization;
            console.log('token', token)
            if (!token) {
                ctx.status = 401
                ctx.body = {
                    msg: 'no auth',
                }
                return
            }
            try {
                const _token=token.replace('Bearer ', '')
                const result = await this.tokenService.verifyToken(_token)
                if (!result) {
                    return
                }
                console.log(result)
                const { userId, exp } = result as any
                const store_token = await this.redis.hget('userId_token_table', userId)
                if (_token === store_token && exp) {
                    await next()
                } else {
                    ctx.status = 401
                    ctx.body = {
                        msg: 'token not match',
                    }
                }
            } catch (err) {
                console.log('ppp', err.name, err.message)
                ctx.status = 401;
                ctx.body = {
                    msg: err.message,
                    name: err.name
                }
            }
        }
    }

}
