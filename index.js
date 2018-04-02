var express        = require('express');
var session        = require('express-session');
var passport       = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request        = require('request');
var handlebars     = require('handlebars');
var fs             = require('fs')

function loadSecret(fn)  {
  fs.readFile('clientsecret', 'utf8', function (err, data) {
    if (err) {
       console.log("hello", err);
    }
    fn(data);
  });
}

const TWITCH_CLIENT_ID = '5oq3yw5jmo4cbcxd18cc7lw4fdu84i';
const SESSION_SECRET   = 'somesecret';
const CALLBACK_URL     = 'http://localhost:3000/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

// Initialize Express and middlewares
var app = express();
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));

app.listen(3000, function () {
  loadSecret(function(TWITCH_SECRET) {
    console.log("twitch secret:", TWITCH_SECRET)
    console.log('Twitch auth sample listening on port 3000!')

    // make request
    var options = {
      url: 'https://api.twitch.tv/helix/users?login=a_seagull',
      method: 'GET',
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization' : 'Bearer kkyp6rlv9f305rktev6kbgkps0ysxw'
      }
    };

    request(options, function (error, response, body) {
      if (response && response.statusCode == 200) {
        console.log("first request successful")
        j = JSON.parse(body)
        uid = j.data[0].id
        var options = {
          url: 'https://api.twitch.tv/helix/webhooks/hub',
          method: 'POST',
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Content-Type': 'application/json',
          },
          body: `{"hub.mode":"subscribe",
"hub.topic":"https://api.twitch.tv/helix/streams?user_id=19070311",
"hub.callback":"http://localhost"
}`,
        };

        request(options, function (error, response, body) {
          if (response && response.statusCode == 202) {
            console.log("request webhooks setup successful");
          } else {
            console.log("request webhooks setup unsuccessful");
          }
        });
      } else {
        console.log("first request unsuccessful");
        console.log(JSON.parse(body));
      }
    });
  });
});
