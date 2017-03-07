const firebase = require("firebase");
const argv = require("minimist")(process.argv.slice(2));;
const moment = require("moment");

firebase.initializeApp({
  apiKey: "AIzaSyACSSeK3z47J56kcuAI_OlIQZXBUslIjYw",
  authDomain: "ruubydev.firebaseapp.com",
  databaseURL: "https://ruubydev.firebaseio.com",
  storageBucket: "ruubydev.appspot.com",
  messagingSenderId: "359470196244"
});

const message = argv["message"];

firebase.auth().signInWithCustomToken(argv["token"])
  .then(() => {
    firebase.database()
      .ref(`/messages/${argv["chat-urn"]}`)
      .push({
        contentType: "text/plain",
        contentLength: message.length,
        message,
        name: argv["sender-name"],
        senderUrn: argv["sender-urn"],
        timestamp: moment().unix(),
      });
  })
  .catch(console.log);
