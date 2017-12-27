const express = require('express');
const jimp = require('jimp');
const fs = require('fs');
const streamToBuffer = require('stream-to-buffer');
const app = express();


var requests_nr = 0;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/image/upload', (req, res) => saveImage(req, res));

app.listen(3000, () => console.log('Server localhost listening on port 3000!'));

function saveImage(req, res) {
    requests_nr += 1;

    fs.existsSync('resized') || fs.mkdirSync('resized');


    streamToBuffer(req, function (err, buffer) {
        // Insert your business logic here
    
        res.status(200).send('File uploaded with succes!');
        jimp.read(buffer, function (err, image) {
            if (err) console.log(err);
            else {
                image.resize(500, 500)            // resize 
                    .write('./resized/' + '500x500' + 'test_image.jpg'); // save 
                image.resize(400, 400)            // resize 
                    .write('./resized/' + '400x400' + 'test_image.jpg'); // save 
                image.resize(300, 300)            // resize 
                    .write('./resized/' + '300x300' + 'test_image.jpg'); // save 
                image.resize(200, 200)            // resize 
                    .write('./resized/' + '200x200' + 'test_image.jpg'); // save 
                image.resize(100, 100)            // resize 
                    .write('./resized/' + '100x100' + 'test_image.jpg'); // save 
                image.resize(50, 50)            // resize 
                    .write('./resized/' + '50x50' + 'test_image.jpg'); // save 
            }
        });
        
    });

    
        
    console.log('number of requests received is now ' + requests_nr);
}