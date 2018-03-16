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