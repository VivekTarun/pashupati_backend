const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server.config');
const connectToDB = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

app.get('/ping', (req, res) => {
    return res.json({message : 'pashupati backend server is alive'});
});

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    connectToDB();
})