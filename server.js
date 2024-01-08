//list of required packages used in the code
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
//making a variable for our database connection string
const connectionString = 'mongodb+srv://admin:keyless@clusterfuck.xpjoyol.mongodb.net/?retryWrites=true&w=majority'

//connecting to the server with a promise as callback functions are deprecated.
//the variable db is for naming our database..the log is just for confirmation
//the variable qCol is for creating our collection within the database
MongoClient.connect(connectionString).then(
    client => {
      console.log('Database Connected!')
      const db = client.db('quotables')
      const quotesCollection = db.collection('quotes')



//settting the view engine to use ejs for our html
app.set('view engine', 'ejs')

//using a middleware called static to make the public file accessible to all
app.use(express.static('public'))

//adding body parser's middleware to read JSON 
app.use(bodyParser.json())

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
    db.collection('quotes')
    .find()
    .toArray()
    .then(results => {
        res.render('index.ejs', {quotes: results})
    }).catch(error => console.error(error))

    
})

//post retreives the data from the form and then does something with depending
//on what it is you want to do with it, hear we are simply logging it
app.post('/quotes', (req, res) => { 
    quotesCollection
    .insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(console.error)
    })

app.put('/quotes', (req, res) => {
    quotesCollection
        .findOneAndUpdate(
            {name: 'Yoda'}, 
            {
            $set: {
                name: req.body.name,
                quote: req.body.quote,
            }, 
            },
            {
                upsert: true,
            })
        .then(result => {
            res.json('success')
        })
        .catch(error => console.error(error))

/*app.delete('/quotes', (req, res) => {
    quotesCollection
        .deleteOne({name: req.body.name})
        .then(result => {
            res.json(`Deleted a quote from Darth Vader`)
        })
        .catch(error => console.error(error))
})*/

    //console.log(req.body)


app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json('Deleted Darth Vadar\'s quote')
        
      })
      .catch(error => console.error(error))
  })

})
  

})

  

