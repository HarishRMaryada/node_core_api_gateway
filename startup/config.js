"use strict"

const config = require('config')
const morgan = require('morgan')

module.exports = function (app) {
    //develop on app startup
    const debug = require('debug')('app:startup')
    //Configuration
    debug(config.get('name'))
    //get user password from env custom env var in config
    debug(config.get('user.password'))

    //enable in development env
    console.log(app.get('env'))

    if (app.get('env') === 'development') {
        debug('Morgan is enabled')
        app.use(morgan('tiny'))
    }
}