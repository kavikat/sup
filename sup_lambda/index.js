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
        request to foursquare API (trending)
    */
    async.waterfall([
        function (callback) {

            request({
                url: 'https://api.foursquare.com/v2/venues/trending',
                method: 'GET',
                qs: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    near: location,
                    radius: 2000,
                    limit: 5,
                    v: '20170801'
                }//qs
            }, function (err, res, body) {
                if (err) {
                    console.log("This is an error message: " + err);
                    output = {
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                "contentType": "PlainText",
                                "content": 'Sorry, I can\'t find anything happening in ' + location
                            } //msg
                        } //dA
                    } //output
                    console.log(output);
                    callback(null, output);
                } else {
                    console.log(body);
                    /*var place = body.response.venues["0"].name,
                        heads = body.response.venues["0"].hereNow.count;*/
                    output = {
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                "contentType": "PlainText",
                                "content": "You might want to check out the following venue (I hope you read JSON): " + body
                            }//message
                        }//dialogAction
                    };//output
                    console.log("Output: " + output);
                    callback(null, output);
                }//else
            });//request

        },
    ],
        function (err, result) {
            console.log(result);
            callback(null, result);
            assert.equal(err, null);
        }
    );

};//handler