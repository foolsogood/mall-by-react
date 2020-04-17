import { inject, plugin,config, provide } from "midway";
import aliSms= require('aliyun-sms-sdk')
export interface IAliyunSmsService extends AliyunSmsService {}

@provide()
export class AliyunSmsService {
  @plugin()
  redis;
  @inject()
  ctx;
  @config('smsConf')
  smsConf
  async bindPhone() {
    const { ctx } = this;
    const { phone, token, code } = ctx.request.body;
    const validateRes = await ctx.service.phone.validateCode(phone, code);
    if (validateRes !== true) {
      return validateRes;
    }
    console.log('validateRes', validateRes);
    const data = await ctx.service.token.verifyToken(token);
    const { userid } = data;
    const res = await ctx.model.User.update(
      {
        phone
      },
      {
        where: { userid }
      }
    );
    if (res) {
      return {
        code: 1,
        msg: '成功'
      };
    } else {
      return {
        code: -1,
        msg: '失败'
      };
    }
  }
  async sendSms(phoneNumber:string) {
    const code = (() => {
      return Math.random()
        .toString(16)
        .substr(2, 6);
    })();
    const {templateCode,accessKeyId,secretAccessKey,signName}= this.smsConf
    //缓存验证码  保证key的唯一性
   await this.redis.set(`${templateCode}_TEL_${phoneNumber}`, code, 'EX', 100);
    const confSend = {
      accessKeyId,
      secretAccessKey,
      recNum: phoneNumber,
      signName,
      templateCode,
      param: { code }
    };
   return aliSms.send(confSend);
  }
  //验证手机和验证码是否匹配
  async validateCode(phoneNumber:string, code:string) {
    const { ctx } = this;
    const {templateCode}= this.smsConf

    // const templateCode = 'SMS_150183914';
    try {
      //redis缓存中手机号对应的验证码
      const cacheCode = await this.redis.get(
        `${templateCode}_TEL_${phoneNumber}`
      );
      console.log('cacheCode', cacheCode,code,code === cacheCode);
      if (cacheCode) {
        if (code === cacheCode) {
          return true;
        } else {
          return {
            code: -1,
            msg: '验证码错误'
          };
        }
      } else {
        return {
          code: -1,
          msg: '验证码失效'
        };
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
}
