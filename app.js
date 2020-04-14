"use strict"
const cluster = require('cluster')

//Cluster Manager
if (cluster.isMaster) {
  cluster.fork()
  // cluster.fork()
  // cluster.fork() 
  // cluster.fork()
} else {
  //third party imports
  const express = require('express')
  const app = express()

  //logs any unexceptional/unhandled errors
  require('./startup/logs')(app)
  require('./startup/db')

  const error = require('./middleware/error')

  //calling api's end point need to simplify and organize
  app.use("/", require("./controllers"))

  //configurables
  require('./startup/config')(app)

  //global error handler
  app.use(error)

  if (app.get('env') === 'production') 
    require('./startup/production')(app) 


  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

