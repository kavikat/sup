var mongoose = require('mongoose'),
    assert = require('assert'),
    async = require('async'),
    Promise = require('bluebird');
/*
    Holi HealthBot LAMBDA Function - submitDiag
        retrieves documents based on condition as key
*/
var db = mongoose.connection,
    Schema = mongoose.Schema,
    output = '';
//connect to DB
mongoose.connect('mongodb://kavika:vdjdYFaXpmflsZ6d@holidb-shard-00-00-0uftc.mongodb.net:27017,holidb-shard-00-01-0uftc.mongodb.net:27017,holidb-shard-00-02-0uftc.mongodb.net:27017/holi?ssl=true&replicaSet=holiDB-shard-0&authSource=admin');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to mongo.');
});
var diagSchema =
    new Schema({
        condition: String,
        symptoms: Array,
        treatments: Array,
        homeRemedies: Array,
        mental: Array
    }, {
        collection: 'diags'
    });
//mongoose models
var Diag = mongoose.model('Diag', diagSchema);
mongoose.Promise = Promise;
/*
    product matching function
*/
function matchProduct(treatments) {
    for (var i = 0; i < treatments.length; i++) {
        output = {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Damazonfresh&field-keywords=" + treatments[i]
                }
            }
        };
    }
    return output;
}
/*
    handler function
*/
exports.handler = function (event, context, callback) {

    var body = event.currentIntent.slots.condition.toLowerCase();
    context.callbackWaitsForEmptyEventLoop = false; //keeps mongoose connection active
    /*

    */
    async.waterfall([
            function (callback) {
                Diag.findOne({
                    'condition': body
                }).then(function (data, err) {
                    if (!data) {
                        console.log("This is an error message: " + err);
                        output = {
                            "dialogAction": {
                                "type": "Close",
                                "fulfillmentState": "Fulfilled",
                                "message": {
                                    "contentType": "PlainText",
                                    "content": 'Sorry, I can\'t find anything for ' + body
                                } //msg
                            } //dA
                        } //output
                        console.log(output);
                        callback(null, output);
                    } else {
                        console.log('Condition : %s \n Treatments : %s', data.condition, data.treatments);
                        var condition = data.condition,
                            treatments = data.treatments;
                        for (var i = 0; i < treatments.length; i++) {
                            output = {
                                "dialogAction": {
                                    "type": "Close",
                                    "fulfillmentState": "Fulfilled",
                                    "message": {
                                        "contentType": "PlainText",
                                        "content": "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Damazonfresh&field-keywords=" + treatments[i]
                                    }
                                }
                            };
                            console.log(output);
                            callback(null, output);
                        }//for
                    } //else
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