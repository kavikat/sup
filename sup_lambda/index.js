var assert = require('assert'),
    async = require('async');
/*
    sup? reccomendation engine
*/

/*
    handler function
*/
exports.handler = function (event, context, callback) {

    var body = event.currentIntent.slots.condition.toLowerCase();
    /*

    */
    async.waterfall([
        function (callback) {

            //TODO - logic for sup, api call to foursquare places API
            const request = require('request');

            request({
                url: 'https://api.foursquare.com/v2/venues/explore',
                method: 'GET',
                qs: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    ll: '40.7243,-74.0018',
                    query: 'coffee',
                    v: '20170801',
                    limit: 1
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