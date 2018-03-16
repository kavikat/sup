     //lambda-local -l index.js -h handler -e holiq.js
     module.exports = {
         "messageVersion": "1.0",
         "invocationSource": "FulfillmentCodeHook or DialogCodeHook",
         "userId": "user-id specified in the POST request to Amazon Lex.",
         "sessionAttributes": {
             "key1": "value1",
             "key2": "value2"
         },
         "bot": {
             "name": "bot-name",
             "alias": "bot-alias",
             "version": "bot-version"
         },
         "outputDialogMode": "Text or Voice, based on ContentType request header in runtime API request",
         "currentIntent": {
             "name": "intent-name",
             "slots": {
                 "location": "san mateo"
             },
             "confirmationStatus": "None, Confirmed, or Denied (intent confirmation, if configured)",
             "inputTranscript": "san mateo, ca"
         }
     };