const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server.config');
const {connectToDB} = require('./config/index')
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const { StatusCodes } = require('http-status-codes');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });

app.use('/api', apiLimiter, apiRouter);

app.get('/ping', (req, res) => {
    return res.status(StatusCodes.OK).json({message : 'pashupati backend server is alive'});
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    connectToDB();
})