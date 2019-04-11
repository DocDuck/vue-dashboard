

const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '737191',
    key: 'ef0658a7f079bacc1c46',
    secret: '77f278f8518ccb20da3f',
    cluster: 'eu',
    encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/app')));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
