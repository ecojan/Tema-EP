const request = require('request');
const fs = require('fs');

const times_to_send = 1;

var request_options = {
    url: 'http://localhost:3000/image/upload',
};

for( var i = 0; i < times_to_send; i ++) {
    var filename = 'test_image.1.jpg';
    fs.createReadStream(filename).pipe(request.post('http://localhost:3000/image/upload?image_name=' + filename,
    function(err, res, body) {
        if(err) console.log(err);
        else {
            console.log(res.statusCode + ' ' + body);
        }
    }));
}