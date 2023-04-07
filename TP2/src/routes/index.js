const express = require('express');
const app = express();
const users = require('./users');
const example = require('./example');
const films = require('./films');
const watchlists = require('./watchlists');

const metrics = {
    requestsCount: {},
};

app.use(express.json());

app.use((req, res, next) => {
    const currentUrlRequestsCount = metrics.requestsCount[req.url];
    metrics.requestsCount[req.url] = currentUrlRequestsCount
        ? currentUrlRequestsCount + 1
        : 1;
    return next();
});

app.use((req, res, next) => {
    console.log(req.url);
    return next();
});

app.use('/users', users);

app.use('/example', example);

app.use('/films', films);

app.use('/watchlists', watchlists);

app.get('/', (req, res, next) => {
    return res.send('Hello World !');
});

app.get('/health', (req, res, next) => {
    return res.status(200).json({ status: 'healthy' });
});

app.get('/metrics', (req, res, next) => {
    metrics.uptime = `${process.uptime().toFixed(2)} seconds`;
    return res.json(metrics);
});

module.exports = app