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
                    client_id: 'ZJUY300MTPEWA5JXG14TNV4BS5MCC4HD34DJTQB04QK3K2WZ',
                    client_secret: 'S5U1O4JNIUQKN33SCT5ZKFRNBXW4FTJNU0UW3K0QJ5BJ4PIV',
                    near: location,
                    radius: 2000,
                    limit: 1,
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
                    var data = JSON.parse(body),
                        place = data.response.venues["0"].name,
                        heads = data.response.venues["0"].hereNow.count;
                    output = {
                        "dialogAction": {
                            "type": "Close",
                            "fulfillmentState": "Fulfilled",
                            "message": {
                                "contentType": "PlainText",
                                "content": "You might want to check out the following venue : " + place + " It looks like there is currently " + heads +" people checked in."
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