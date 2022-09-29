/** Server 입니다. */

const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.use(cors(
    {
        'Access-Control-Allow-Origin' : '*'
    }
));


app.listen(9200, () => {
    console.log('listening on 9200');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send('로그인 성공');
});