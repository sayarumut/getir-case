require('dotenv').config({path: __dirname + '/.env'});
const app = require('./app.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

process.on('SIGINT', () => killProcess("SIGINT"))
    .on('SIGTERM', () => killProcess("SIGTERM"))
    .on('SIGQUIT', () => killProcess("SIGQUIT"))
    .on('uncaughtException', (err) => {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        console.error(err.stack)
        process.exit(1);
    }).on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    });

const killProcess = (signal) => {
    console.info(`${signal} signal received. Closing server...`);
    setTimeout(shutdownGracefully, 300);
}

const shutdownGracefully = () => {
    server.close(function (err) {
        if (err) {
            console.error(err);
            process.exit(1); // failure
        }

        mongoose.connection.close(function () {
            console.log('Mongo connection is closed!');
            process.exit(0); // success
        })
    })
}
