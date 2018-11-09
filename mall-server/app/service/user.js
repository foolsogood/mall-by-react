const Service = require("egg").Service;
class UserService extends Service {
  async register(user) {
    const { ctx } = this;
    const { username, password } = user;
    try {
      console.log(ctx.model);
      let res = await ctx.model.user.create({ username, password });
      console.log(res);
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserService;
