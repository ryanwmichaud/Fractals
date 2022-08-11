const { json } = require('body-parser')
const express = require('express')
const app = express()
app.use(express.json({limit : '1mb'}))


app.listen(3000,()=>{console.log('running on port 3000')})
app.use(express.static('public'))

app.post('/entries',(req,res)=>{
    console.log('server got a post')
    console.log(req.body)
    res.json({
        status: 'good',
        ok: 'yes',
        title: req.body.title,
        author: req.body.author
        })
})