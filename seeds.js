var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud Rest",
        image: "https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20-640x427.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name:"Desert Mesa",
        image: "https://s3-us-west-2.amazonaws.com/axiomimagesthumbs-or/proxy/thumbs/AX135_172-00002.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    },
    {
        name:"Canyon floor",
        image: "https://www.canyontours.com/wp-content/uploads/2014/10/grand-canyon-west-rim-colorado-river.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed Campgrounds");
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log();
                } else {
                    console.log("Add a campground");
                    // Add a few comments
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    
    // Add a campground
    
    
    
}

module.exports = seedDB;