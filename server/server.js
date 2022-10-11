/** Server 입니다. */

/** Config */
require("dotenv").config();
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const app = express();


var db;

/** 미들웨어 설정 */
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cors(
    {
        'Access-Control-Allow-Origin' : '*'
    }
));


/** 비밀번호 암호화 
 * @password user password
 * @salt salt값
*/
const encryptPssword = async (password, salt) => {
    return crypto.createHash('sha512').update(password + salt).digest('hex');
}

/** Access Token 생성
 * @user user id
 */
const createAccessToken = (user) => {

    return jwt.sign({user}, process.env.ACCESS_TOKEN, {
        expiresIn : "3600s"
    })
}

/** Refresh Token 생성 
 * @user user id
*/
const createRefreshToken = (user) => {

    return jwt.sign({user}, process.env.REFRESH_TOKEN, {
        expiresIn : "10 days"
    })
}

const accessVerify = async (token) => {

    if(!token)
    {        
        console.log('Token missing');
        return false;
    }
    else
    {
        const result = await jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
            if(err)
            {
                console.log('Access Token is not verify')
                return false;
            }
                
            else
            {
                console.log('Access Token is verify');
                return true;
            }
        });

        return result;
    }
}

const checkRefresh = async (token) => {

    const result = await jwt.verify(token, process.env.REFRESH_TOKEN, (err, payload) => {
        if(err)
        {
            console.log('Refresh Token is not verify')
            return false;
        }
        else
        {
            console.log('Refresh Token is verify');
            return true;
        }
    });

    return result;
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

        const salt = await crypto.randomBytes(128).toString('base64'); // 랜덤한 salt값 새성
        const hashPassword = await encryptPssword(req.body.pwd, salt);
        console.log(req.body.pwd);

        const data = {
            firstName : req.body.firstName, // 성
            lastName : req.body.lastName, // 이름
            user : req.body.id, // 이메일 또는 전화번호
            password : hashPassword, // 암호화된 패스워드
            salt : salt // salt 값
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

            if(result == null){
                console.log('로그인 실패');
                res.send(false);
            }
            else{
                const checkPassword = await encryptPssword(req.body.pwd, result.salt); // 체크할 패스워드
            
                if(checkPassword == result.password){
                    
                    /** 토큰 발급 */
                    let accessToken = await createAccessToken(req.body.id);
                    let refreshToken = await createRefreshToken(req.body.id);
    
                    res.send({auth : true, accessToken, refreshToken}); // 로그인 성공시 반환값
                    console.log(`${req.body.id} - 로그인 성공`);
                }
                else
                {
                    console.log('로그인 실패');
                    res.send(false);
                }
            }
        });
    });

    // Access Token Check
    app.get('/check', async (req, res) => {
        let check =  await accessVerify(req.headers['jwt_access_token']);
        console.log(check);
        await res.send(check);
    });

    app.post('/token', async (req, res) => {
        const result = await checkRefresh(req.body.token);

        if(result == true){
            let accessToken = await createAccessToken(req.body.id);
            let refreshToken = await createRefreshToken(req.body.id);
            console.log('토큰 재발급');
            res.send({access : true, accessToken, refreshToken});
        }
        else{
            res.send({access : false});
        }
    })
});

