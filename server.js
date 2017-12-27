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
        image.resize(200, 200)            // resize 
             .write('./resized/' + '200x200' + req.file.filename); // save 
    });
        
    });   
}