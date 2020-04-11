const express = require('express')
const router = express.Router()
const asyncMiddleware = require('../middleware/async')



router.get('/', asyncMiddleware(
    (req, res) => {
        throw new Error('Error with API call')
        //res.send('Hello World!')
        // try{
        //    // res.send('Hello World!')
        //     throw new Error('Error data')
        // }
        // catch(ex){
        //     next(ex)
        // }   
    }
))

router.get('/fast', (req, res) => {
    res.send('Fast!')
})

module.exports = router