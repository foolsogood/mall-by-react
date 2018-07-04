const jwt=require('jsonwebtoken');
const {secret} =require('../config/secret')

function createToken(payload = {}) {                                    
    return jwt.sign(payload, secret, { expiresIn: '4h' });
}
module.exports=createToken