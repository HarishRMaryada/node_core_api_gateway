const cluster = require('cluster')

//Cluster Manager
if (cluster.isMaster) {
  cluster.fork() 
  cluster.fork()
  cluster.fork() 
  cluster.fork()
} else {
  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/fast', (req, res) => {
    res.send('Fast!')
  })

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

}

