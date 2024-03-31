const mongoose = require("mongoose");

const user=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        }
    ],
    likedPlaylists: {
        type: String,
        default: "",
    },
    subscribedArtists: {
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("User", user);

module.exports = UserModel;
