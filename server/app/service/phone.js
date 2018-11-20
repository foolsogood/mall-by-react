const Service = require('egg').Service;
const aliSms = require('aliyun-sms-sdk');

class PhoneService extends Service {
    async bindPhone(){
        const {ctx}=this
        const {phone,token,code}=ctx.request.body
        await ctx.service.phone.validateCode(phone,code)
        const data=await ctx.service.token.verifyToken(token)
        const {userid}=data
        const res=await ctx.model.User.update({
          phone
        },{
          where:{userid}
        })
        if(res){
          return {
            code:1,
            msg:'成功'
          }
        }else{
          return {
            code:-1,
            msg:'失败'
          }
        }
      }
    async sendSms(phoneNumber) {
        const code = (() => {
            return Math.random().toString(16).substr(2, 6)
        })()
        const { ctx, app } = this
        const templateCode = 'SMS_150183914'
        //缓存验证码  保证key的唯一性
        app.redis.set(`${templateCode}_TEL_${phoneNumber}`, code, 'EX', 60)
        const confSend = {
            accessKeyId: 'LTAImYw1P9qavGsM',
            secretAccessKey: 'B8ueSfNLB2PRXMJTioUfL3aQ2cwa7Q',
            recNum: phoneNumber,
            signName: '火烈鸟商家管理系统',
            templateCode,
            param: { code }
        };
        aliSms.send(confSend);
    }
    //验证手机和验证码是否匹配
    async validateCode(phoneNumber, code) {
        const { ctx, app } = this
        const templateCode = 'SMS_150183914'
        try {
            //redis缓存中手机号对应的验证码
            const cacheCode = await app.redis.get(`${templateCode}_TEL_${phoneNumber}`)
            if (cacheCode) {
                if (code === cacheCode) {
                    return true
                } else {
                    ctx.body = {
                        code: -1,
                        msg: '验证码错误'
                    }
                    return false
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '验证码失效'
                }
                return false
            }
        } catch (err) {
            ctx.throw(err)
        }
    }
}
module.exports = PhoneService