var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var getKey = require("../API_KEY")
var yelp = require("../yelp")
const googleMapsClient = require('@google/maps').createClient({
  key: getKey('Google'),
  Promise: Promise
});


//INDEX - show all campgrounds
router.get("/", function(req, res) {
    req.user
    // Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var location;
    var image = req.body.image;
    var desc = req.body.description;
    var author = { 
        id : req.user._id,
        username: req.user.username
    }
    var thingsToDo = []
    googleMapsClient.geocode({address: name}, function(err, response) {
        if (!err) {
            location = response.json.results[0].geometry.location;
            thingsToDo = yelp.findNearBy(location.lat, location.lng);
            console.log("In Geocode, Things to do is ")
            console.log(thingsToDo)
        } else {
            console.log("Get Geo Info fail");
            console.log(err);
        }
    })
        .asPromise()
        .then((response) => {
            var newCampground = {name: name, image: image, description: desc, location: location,
            author: author, thingsToDo: thingsToDo};
            console.log("new Campground is ");
            console.log(newCampground);
            // Create a new campground and save to database
            Campground.create(newCampground, function(err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

// New route
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

//SHOW - show more info about campground
router.get("/:id", function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show.ejs", {campground: foundCampground});
        }
    });
});

// Edit campground route
router.get("/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
    
});
// Update campground route
router.put("/:id", function(req, res) {
    // find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //
});

// Delete campground route
router.delete("/:id", function(req, res) {
    Campground.findOneAndDelete(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;