const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const salt = 10;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const path = require('path');




const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST","GET","DELETE"],
    credentials: true
}));
app.use('/images', express.static("E:\\projects\\spring_web_music\\uploads\\"));
app.use('/music_file',express.static("E:\\projects\\spring_web_music\\upload_music\\"))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'admin',
    database: 'musicplayer'
});


// song
app.get('/songs', (req, res) => {
    const sql = "SELECT * FROM songs";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        const result = res.json(data);
        console.log(result);
    });
});

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `E:\\projects\\spring_web_music\\uploads\\${filename}`;
    res.sendFile(filePath);
});

app.get('/music_file/:filename',(req,res) => {
    const filename = req.params.filename;
    const filePath = `E:\\projects\\spring_web_music\\upload_music\\${filename}`;
    res.sendFile(filePath);
})

app.get('/artists/:id_artist', (req,res)=>{
    const id_artist = req.params.id_artist;

    const sql = "SELECT artist_name FROM  artists WHERE id_artist=?";
    db.query(sql, [id_artist], (err,data)=>{
        if(err) return res.json({Error: err.message});
        if(data.length > 0){
            const artist_name = data[0].artist_name;
            return res.json({artist_name})
        }else {
            return res.json({artist_name:"Unknown"})
        }
    })

})

//player
app.get('/songs/:id_song',(req, res)=>{
    const id_song = req.params.id_song;

    const sql = "SELECT * FROM songs WHERE id_song =?";
    db.query(sql,[id_song],(err,data)=>{
        if(err) return res.json({Error: err.message});
        if(data.length){
            const song_name = data[0].song_name;
            const lyric = data[0].lyric;
            const image = data[0].image;
            const id_category = data[0].id_category;
            const file_music = data[0].file_music;
            const id_artist = data[0].id_artist;
            const song = {
                id_song: id_song,
                song_name: song_name,
                lyric: lyric,
                image: image,
                id_category: id_category,
                file_music: file_music,
                id_artist: id_artist
            }
            res.json(song)
        }else{
            res.json({Error: "Song not found"})
        }
    })
})



// user

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


//search

app.listen(8081, () => {
    console.log("listening");
});