const express = require('express');
const jimp = require('jimp');
const fs = require('fs');
const streamToBuffer = require('stream-to-buffer');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');


var requests_nr = 0;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/image/upload', (req, res) => saveImage(req, res));

app.listen(3000, () => console.log('Server localhost listening on port 3000!'));

function saveImage(req, res) {
    requests_nr += 1;
    var filename = req.param('image_name');

    fs.existsSync('resized') || fs.mkdirSync('resized');

    streamToBuffer(req, function (err, buffer) {
        // Insert your business logic here
        if(err) { 
            console.log(err)
            res.status(500).send('Problem during upload');
            return;
        }
        res.status(200).send('File uploaded with succes!');
        jimp.read(buffer).then(function (image) {
                image.resize(500, 500)            // resize 
                    .write('./resized/' + '500x500' + filename) // save 
                .resize(400, 400)           // resize 
                    .write('./resized/' + '400x400' + filename) // save 
                .resize(300, 300)            // resize 
                    .write('./resized/' + '300x300' + filename) // save 
                .resize(200, 200)            // resize 
                    .write('./resized/' + '200x200' + filename) // save 
                .resize(100, 100)            // resize 
                    .write('./resized/' + '100x100' + filename) // save 
                .resize(50, 50)            // resize 
                    .write('./resized/' + '50x50' + filename); // save 
            }
        ).catch(function (err) {
            console.error(err);
        });
        
    });

    
        
    console.log('number of requests received is now ' + requests_nr);
}