const cluster = require('cluster')

//Cluster Manager
if (cluster.isMaster) {
  cluster.fork() 
  // cluster.fork()
  // cluster.fork() 
  // cluster.fork()
} else {
  const config = require('config')
  const express = require('express')
  const helmet = require('helmet')
  const morgan = require('morgan')
  const app = express()
  

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

  
  const port =  process.env.PORT || 3000
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

