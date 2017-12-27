const request = require('request');
const fs = require('fs');

const times_to_send = 10;

for( var i = 0; i < times_to_send; i ++) { 
    fs.createReadStream('test_image.jpg').pipe(request.post('http://localhost:3000/image/upload', function(err, res, body) {
        if(err) console.log(err);
        else {
            console.log(res.statusCode + ' ' + body);
        }
    }));
}