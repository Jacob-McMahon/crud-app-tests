//list of required packages used in the code
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const mongoDB = require('mongodb').MongoClient
//making a variable for a database
const connectionString = 'mongodb+srv://admin:keyless@clusterfuck.xpjoyol.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
    if(err) return console.error(err)
    console.log('Connection secured!')
})

//since body-parser is a middleware we need to use the 'use' method to
//to be able to use it. urlencoded method tells BP to extrct data from the form
app.use(bodyParser.urlencoded({ extended: true }))

//creating the server that browsers can find
app.listen(8000, function(){
console.log('listening on 8000')
})

//lets the server know what to do with the browsers request
//Here we are loading the file index.html as a response
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//post retreives the data from the form and then does something with depending
//on what it is you want to do with it, hear we are simply logging it
app.post('/quotes', (req, res) => { 
    console.log(req.body)
})

