/** Server 입니다. */

const http = require('http');
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cors(
    {
        'Access-Control-Allow-Origin' : '*'
    }
));

var db;

/** Mongo DB Connect */
MongoClient.connect('mongodb+srv://whitefox:7018blue9093@whitefox.esdrlal.mongodb.net/?retryWrites=true&w=majority', 
(error, client) => {
    if(error)
        return console.log(error);
    
    db = client.db('user');

    

    app.post('/createuser', (req, res) => {
        db.collection('user infomation').insertOne(req.body, (error, result) => {
            console.log('저장완료');
        });
        res.send('회원가입 성공');
    });


    app.listen(9200, () => {
        console.log('listening on 9200');
    });
})


app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('로그인 성공');
});