const Google_API_KEY = 'AIzaSyC789sm6LiGNE-x-47HlsPQH1u9wGHhV_A';
const Yelp_API_KEY = 'JKaX3XMdyeOl0cklP0xvCrR3QuEygYYy5eEWLhsnYXuYn9nqto4Y9LmD11ABtOXtNiv_sXZbv9WUot6WZRtTQA-Z1d58MvFzPXqhvbaGBvMp_3IswU452hD856TnW3Yx'

function getKey(req) {
    if (req == 'Google') {
        return Google_API_KEY;
    } 
    if (req == 'Yelp') {
        return Yelp_API_KEY;
    }
}
module.exports = getKey;