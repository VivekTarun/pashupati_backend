const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server.config');
const connectToDB = require('./config/db.config');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const { StatusCodes } = require('http-status-codes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.status(StatusCodes.OK).json({message : 'pashupati backend server is alive'});
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    connectToDB();
})