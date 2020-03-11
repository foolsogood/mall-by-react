import {  provide,  config } from 'midway'
// import {IDecoded} from './interface'
const jwt = require('jsonwebtoken')

export interface ITokenService extends TokenService { }

@provide()
export class TokenService {

    
    @config('jwtConf')
    jwtConf;
    
    async genToken(userId: number):Promise<string> {
        const token = await jwt.sign(
            { userId },
            this.jwtConf.secret,
            { expiresIn: this.jwtConf.expiresIn }
        )
        return token
    }
    async verifyToken(token: string) {
        const _verify = (token, cert) => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, cert, function (err, decoded) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });
        };
        try {
            const decoded = await _verify(token, this.jwtConf.secret);
            // const { exp, iat, data } = decoded;
            console.log('token service', decoded);
            return decoded
        } catch (err) {
            console.log(err)
            throw err
        }
    }

}