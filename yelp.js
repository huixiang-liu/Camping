var express     = require("express"),
    getKey      = require("./API_KEY"),
    yelp = require('yelp-fusion'),
    app         = express();

const client = yelp.client(getKey('Yelp'));

function findNearBy(lat, lng) {
    console.log("Now we start findNearBy function");
    var thingsToDo = [];
    client.search({
        term: "things to do",
        latitude: lat,
        longitude: lng
    }).then(response => {
        let size = response.jsonBody.businesses.length;
        for (var i = 0; i < Math.min(3, size); i++) {
            console.log("The " + i + "th business is ")
            console.log(response.jsonBody.businesses[i].name)
            let thingToDo = {
                name: response.jsonBody.businesses[i].name,
                link: response.jsonBody.businesses[i].url,
                image: response.jsonBody.businesses[i].image_url
            }
            thingsToDo.push(thingToDo)
        }
        return thingsToDo;
    })
}

exports.findNearBy = findNearBy;