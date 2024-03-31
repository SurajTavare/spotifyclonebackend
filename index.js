const express=require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const cors = require("cors");
const User=require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

const app=express(); 
const port=8080;

app.use(cors());
app.use(express.json());


//mongoDB connection
mongoose.connect("mongodb+srv://surajtavare1111:"+process.env.MONGO_PASSWORD+"@cluster0.q90m5wk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//  }
)
.then((x) => {
    console.log("Connected to Mongo!");
})
.catch((err) => {
    console.log("Error while connecting to Mongo");
});

// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);



app.get("/",(req,res)=>{
    res.send("helo")
})

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);


app.listen(port,()=>{
    console.log("app is runing...")
})