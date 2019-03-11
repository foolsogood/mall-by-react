const path = require('path');
// exports.cluster = {
//     listen: {
//         port: 7001,//端口
//         hostname: '120.79.226.148', //你的IP
//       },
// };


exports.alinode = {
    appid: '75971',
    secret: '7ae5141cc7bfbd1845b2bd6b4c50da389532d2f6',
};

exports.aliyunApiGateway = {
    appKey: '',
    appSecret: '',
    baseUrl: 'http://'
};

exports.oss = {
    client: {
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        endpoint: '',
        timeout: '60s',
    },
};

exports.multipart = {
    fileSize: '20mb',
    whitelist: [
        '.jpg', '.jpeg', // image/jpeg
        '.png', // image/png, image/x-png
        '.gif', // image/gif
        '.bmp', // image/bmp
    ]
};