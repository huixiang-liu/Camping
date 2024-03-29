var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: {
        lat: Number,
        lng: Number
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    thingsToDo :[{
        name: String,
        link: String,
        image: String
    }]
});

module.exports = mongoose.model("Campground", campgroundSchema);