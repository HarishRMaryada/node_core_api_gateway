const cluster = require('cluster')

//Cluster Manager
if (cluster.isMaster) {
  cluster.fork() 
  // cluster.fork()
  // cluster.fork() 
  // cluster.fork()
} else {
  //third party imports
  const config = require('config')
  const express = require('express')
  const helmet = require('helmet')
  const morgan = require('morgan')
  const winston  = require('winston')


  //application imports
  const error = require('./middleware/error')
  const app = express()


  process.on('uncaughtException',(ex)=>{
    winston.error(ex.message,ex)
  })
  
  process.on('unhandledRejection',(ex)=>{
    winston.error(ex.message,ex)
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


  if(app.get('env') !== 'production'){
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

  //calling api's end point need to simplify and organize
  app.use("/",require("./controllers"))

  app.use(helmet())

  //develop on app startup
  const debug = require('debug')('app:startup')
  //Configuration
  debug(config.get('name'))
  //get user password from env custom env var in config
  debug(config.get('user.password'))

  //enable in development env
  console.log(app.get('env'))
  if(app.get('env') === 'development'){
    debug('Morgan is enabled')
    app.use(morgan('tiny'))
  }

  //develop on app db 
  const dbdebug = require('debug')('app:db')
  dbdebug("Db en")

  //global error handler
  app.use(error)

  
  const port =  process.env.PORT || 3000
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

