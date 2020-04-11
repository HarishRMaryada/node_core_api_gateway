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
  

  app.use(helmet())

  //Configuration
  console.log(config.get('name'))
  //get user password from env custom env var in config
  console.log(config.get('user.password'))

  //enable in development env
  console.log(app.get('env'))
  if(app.get('env') === 'development'){
    console.log('Morgan is enabled')
    app.use(morgan('tiny'))
  }
  

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/fast', (req, res) => {
    res.send('Fast!')
  })
  const port =  process.env.PORT || 3000
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

