
**Sup is a recommendation engine chatbot that connects you with the most happening (“buzzing") venues in your locale.**

### How It Works

![](sup_dialog.png)

Starting a dialog with Sup? is as easy as sending the word “sup” through one of the available channels (SMS,FB Messenger). The Sup? bot will inquire which location you are looking for and let you know if there are any buzzing venues that you might want to check out.

- - - -

#### Channels:

##### ~~SMS : +1 (650) 822-3156
##### FB Messenger : [@botthatlife](https://www.facebook.com/botthatlife/)~~

- - - -

### Stack
* [Foursquare Places API](https://developer.foursquare.com/places-api)
* [Twilio Messaging API](https://www.twilio.com/docs/api/messaging)
* [NodeJS](https://nodejs.org/en/)
* [AWS Lex](https://aws.amazon.com/lex/)
* [AWS Lambda](https://aws.amazon.com/lambda/)

- - - -

### Open Source TODO’s
1. **City validation** (known issue), returns error when non-city string is entered in second part of dialog.
2. **Cards** , return  more detailed venue information.
3. **Geospatial suggestions**, build a richer suggestion engine, possibly couple with another venues-like API.
