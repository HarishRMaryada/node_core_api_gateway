
"use strict"
const winston = require('winston')

module.exports = function (app) {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex)
    })

    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex)
    })

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/combined.log' })
        ]
    });

    if (app.get('env') !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
}