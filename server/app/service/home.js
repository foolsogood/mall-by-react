
'use strict';
const {Service} = require('egg');
class HomeService extends Service{
   async getHomeBanner(){
       const {ctx}=this
       return ctx.model.Banner.findAll()
   }
}
module.exports=HomeService