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
                }//qs
            });//request
        },//function1
        function (err, res, body) {
            if (err) {
                console.error(err);
                output = {
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            "contentType": "PlainText",
                            "content": 'Sorry, I can\'t find anything happening in' + body + ' right now.'
                        } //msg
                    } //dA
                } //output
                callback(null, output);
            } else {
                console.log(body);
                var place = res.name,
                    heads = res.hereNow.count;
                output = {
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            "contentType": "PlainText",
                            "content": "It looks like there is " + heads + " currently checked in at " + place + ", you might wanna check it out."
                        }
                    }
                };
            }//else
            callback(null, output);
        }//function2
    ],
        function (err, result) {
            console.log(result);
            callback(null, result);
            assert.equal(err, null);
            context.succeed();
        }
    );
};

