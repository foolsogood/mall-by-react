const path = require("path");
const Service = require("egg").Service;
const sendToWormhole = require("stream-wormhole");
class UploadService extends Service {
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const { token } = stream.fields;
    const data = await ctx.service.token.verifyToken(token);
    const { userid } = data;
    try {
      let result = await ctx.oss.put(name, stream);
      return {
        url: result.url,
        userid
      };
    } catch (err) {
      return null
    } finally {
      await sendToWormhole(stream);
    }
  }
}
module.exports = UploadService;
