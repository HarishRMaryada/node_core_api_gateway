"use strict"

const express = require('express')
const router = express.Router()
const asyncMiddleware = require('../middleware/async')



router.get('/', asyncMiddleware(
    (req, res) => {
        throw new Error('test')
        res.send('Hello World!')  
    }
))

router.get('/fast', (req, res) => {
    res.send('Fast!')
})

module.exports = router