const express = require('express');
const multer  = require('multer');
const jimp = require('jimp');

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('myFile'); 


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/image/upload', (req, res) => saveImage(req, res));

app.listen(3000, () => console.log('Server localhost listening on port 3000!'));

function saveImage(req, res) {
    upload(req, res, function(err){
        if(err) {
            return res.status(500).send('Error uploading file');
        }
        res.status(200).send('File uploaded successfully');

        jimp.read('./'+req.file.path, function (err, image) {
            if (err) throw err;
            image.resize(500, 500)            // resize 
                .write('./resized/' + '500x500' + req.file.filename); // save 
            image.resize(400, 400)            // resize 
                .write('./resized/' + '400x400' + req.file.filename); // save 
            image.resize(300, 300)            // resize 
                .write('./resized/' + '300x300' + req.file.filename); // save 
            image.resize(200, 200)            // resize 
                .write('./resized/' + '200x200' + req.file.filename); // save 
            image.resize(100, 100)            // resize 
                .write('./resized/' + '100x100' + req.file.filename); // save 
            image.resize(50, 50)            // resize 
                .write('./resized/' + '50x50' + req.file.filename); // save 
        });
        
    });   
}