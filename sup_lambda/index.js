const assert = require('assert'),
    async = require('async'),
    request = require('request');
var output = '';
/*
    sup? reccomendation engine
*/

/*
    handler function
*/
exports.handler = function (event, context, callback) {

    var location = event.currentIntent.slots.location;
    /*

    */
    request({
        url: 'https://api.foursquare.com/v2/venues/trending',
        method: 'GET',
        qs: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            near: location,
            radius: 2000,
            limit: 1,
            v: '20170801'
        }//qs
    }, function (err, res, body) {
        if (err) {
            console.error(err);
        } else {
            console.log(body);
        }
    });
};