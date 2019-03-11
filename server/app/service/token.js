'use strict';
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const { cert } = require('../public/private_key');
class TokenService extends Service {
  //查找token
  async getToken(userid) {
    const token = await this.app.redis.get(`TOKEN_${userid}`);
    return token;
  }
  //解密token (看是否过期或是否有效等)
  async verifyToken(token) {
    const _verify = (token, cert) => {
      return new Promise((resolve,reject) => {
        jwt.verify(token, cert, function(err, decoded) {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
    };
    try {
      let decoded = await _verify(token, cert);
      let { exp, iat, data } = decoded;
      console.log('token service', decoded);
      // let current = Math.floor(Date.now() / 1000);
      // if (current <= exp) {
      //   res = data;
      // }
      // console.log('hhhh',res)
      return data;
    } catch (err) {
      //如果过期或Token无效都走这里，所以try里无需做是否过期的校验
      return {
        name:err.name,
        message:err.message,
      };
    }
  }
  //生成token
  async genToken(data, time) {
    let created = Math.floor(Date.now() / 1000);
    const expire = created + time;
    const token = await jwt.sign(
      {
        data,
        exp: expire
      },
      cert
    );
    this.app.redis.set(`TOKEN_${data.userid}`, token, 'EX', time);
    return token;
  }
}
module.exports = TokenService;
