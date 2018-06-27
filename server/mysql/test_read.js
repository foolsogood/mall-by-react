const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '..', 'mysql/mockData.json')

fs.readFile(filePath, (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data)
    }
})