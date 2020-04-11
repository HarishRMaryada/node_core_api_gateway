const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/fast', (req, res) => {
    res.send('Fast!')
})

module.exports = router