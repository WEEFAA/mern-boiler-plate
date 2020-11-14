const express = require('express')
const router = express.Router()

const fruits = ['apple', 'banana', 'grapes']

// get some fruits
router.get('/fruits', (req,res) => {
    try{
        return res.json({ data: fruits })
    }catch(e){
        return res.status(400).json({})
    }
})

// add some fruits
router.post('/fruits', (req,res) => {
    try{    
        const { query } = req 
        const { newFruit } = query
        // add new
        fruits.push(newFruit)
        // return updated fruits
        return res.json({ data: fruits })
    }catch(e){
        return res.status(400).json({})
    }
})

module.exports = router