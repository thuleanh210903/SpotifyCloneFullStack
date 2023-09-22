const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const salt = 10;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST","GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'admin',
    database: 'musicplayer'
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        console.log("aaaaa")
        return res.json({Error: "You are not authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key", (err,decoded) => {
            if(err) {
                return res.json({Error: "Token is not oke"})
            }else{
                req.username = decoded.username
                next()
            }
        } )
    }
}
app.get('/', verifyUser , (req, res) => {
    return res.json({Status: "Success", username: req.username});
});

app.get('/songs', (req, res) => {
    const sql = "SELECT * FROM songs";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        const result = res.json(data);
        console.log(result);
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO user (`username`,`email`,`password`) VALUES (?,?,?)";

    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });
        const value = [
            req.body.username,
            req.body.email,
            hash
        ];

        db.query(sql, value, (err, result) => {
            if (err) return res.json({ Error: err.message });

            return res.json({ Status: "Success" });
        });

    });

});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?"
    db.query(sql, [req.body.email], (err, data)=>{

        if(err) return res.json({Error: err.message})

        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"})
                if(response) {
                    const username = data[0].username
                    const token = jwt.sign({username}, "jwt-secret-key", {expiresIn: "1d"})
                    res.cookie('token',token)
                    return res.json({Status: "Success"})
                }else {
                    return res.json({Status: "Password not matched"})
                }
            })
        }else{
            return res.json({Status: "No email existed"})
        }
    })
})

app.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status: "Logged out"})
})

app.listen(8081, () => {
    console.log("listening");
});