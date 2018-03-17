const assert = require('assert'),
    async = require('async'),
    request = require('request');
/*
    sup? reccomendation engine
*/

/*
    handler function
*/
exports.handler = function (event, context, callback) {

    var body = event.currentIntent.slots.location.toLowerCase();
    /*

    */
    async.waterfall([
        function (callback) {

            //logic for sup, api call to foursquare places API

            request({
                url: 'https://api.foursquare.com/v2/venues/trending',
                method: 'GET',
                qs: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    near: body,
                    radius: 2000,
                    limit: 1,
                    v: '20170801'
                }
            }, function (err, res, body) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(body);
                }
            });

        },
        function (output, callback) {
            console.log(output);
            callback(null, output);
        },
    ],
        function (err, result) {
            console.log(result);
            callback(null, result);
            assert.equal(err, null);
            context.succeed();
        }
    );
};