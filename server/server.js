/** Server 입니다. */

const crypto = require('crypto');
const http = require('http');
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var db;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cors(
    {
        'Access-Control-Allow-Origin' : '*'
    }
));

/** 비밀번호 암호화 */
const encryptPssword = async (password, salt) => {
    return crypto.createHash('sha512').update(password + salt).digest('hex');
}

/** Mongo DB Connect */
MongoClient.connect('mongodb+srv://whitefox:7018blue9093@whitefox.esdrlal.mongodb.net/?retryWrites=true&w=majority', 
(error, client) => {
    if(error)
        return console.log(error);
    
    db = client.db('user');

    /** 서버 실행 */
    app.listen(9200, async () => {
        console.log('listening on 9200');
    });

    /** 회원가입 요청 */
    app.post('/createuser', async (req, res) => {

        const salt = await crypto.randomBytes(128).toString('base64');
        const hashPassword = await encryptPssword(req.body.pwd, salt);
        console.log(req.body.pwd);

        const data = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            user : req.body.id,
            password : hashPassword,
            salt : salt
        }

        db.collection('user infomation').insertOne(data, (error, result) => {
            console.log('저장완료');
        });
        res.send('회원가입 성공');
    });


    /** 로그인 요청 */
    app.post('/login', (req, res) => {
        db.collection('user infomation').findOne({user : req.body.id}, async (error, result) => {
            if(error)
                console.log(error);
            
            const checkPassword = await encryptPssword(req.body.pwd, result.salt);
            
            if(checkPassword == result.password){
                
                console.log('로그인 성공');
                res.send('로그인 성공');
            }
            else
            {
                console.log('로그인 실패');
            }
        });
    });
});