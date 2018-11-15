const jwt=require('jsonwebtoken');
const {secret}=require('../public/private_key')
console.log(secret)
function createToken(data,time){
    let created=Math.floor(Date.now()/1000);
    let token=jwt.sign({
        data,
        exp:created+time
    },secret,{algorithm:'RS256'});
    return token
}
console.log(createToken('tycho',10))