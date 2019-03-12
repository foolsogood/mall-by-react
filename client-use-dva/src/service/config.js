let server='http://127.0.0.1:7001'
if(process.env.NODE_ENV === 'mock'){
    server = "http://localhost:3000";
}
module.exports= {
    server
}
