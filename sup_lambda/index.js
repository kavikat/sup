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

    var body = event.currentIntent.slots.location,
        placeName=null,
        headCount=0;
    /*
    */
   function(callback){
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
    }, function (err, res, body) {
        if (err) {
            console.error(err);
        } else {
            //console.log(body);
            placeName = body.response.venues["0"].name,
            headCount = body.response.venues["0"].count;
            console.log("There is "+headCount+" checked in at"+placeName);
        }
    });
}//function
};

