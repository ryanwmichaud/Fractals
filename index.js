//const { json } = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Entry = require('./Entry.js')

const uri = 'mongodb+srv://user1:user1Password@cluster0.cmggh79.mongodb.net/?retryWrites=true&w=majority'
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log('connected to mongodb');
    }
    catch(error){
        console.log('error connecting to mongodb');
    }
}


app.use(express.json({limit : '1mb'}))
//app.use(bodyParser.json())

app.listen(3000,()=>{console.log('running on port 3000')})
app.use(express.static('public'))

var loaded = ''


app.post('/entries',(req,res)=>{
    console.log('server got a post')
   
    const e = new Entry({
        title: req.body.title, 
        author: req.body.author, 
        instructions: req.body.instructions, 
        date: req.body.date,
        image: req.body.image
    })


    e.save().then(()=>{console.log('saved')})
    res.json({
        status: 'good'
        })
})

app.get('/entries', (req,res)=>{
    const data = Entry.find().then((data)=>{
        res.send(data)
    })
    
    
})

app.post('/loaded', (req,res)=>{
    console.log('got',req.body)
    loaded = req.body.data
    res.json({
        status: 'good',
        instructions: req.body.data
    })
})

app.get('/loaded',(req,res)=>{
    res.send(JSON.stringify(loaded))
})


connect()
