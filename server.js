let express = require('express')
let app = express()
let bodyParser = require('body-parser')


// Moteur de template
app.set('view engine', 'ejs')


// Middlewares
app.use('/public', express.static('public'))
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))
app.use('/jquery', express.static('node_modules/jquery/dist'))
app.use('/angular', express.static('node_modules/angular'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//Routes
app.get('/', (req, res) => {
  res.render('connection')
})

app.get('/registration', (req, res) => {
  res.render('registration')
})

app.post('/form_registration', (req, res) => {
  let MongoClient = require('mongodb').MongoClient
  let url = 'mongodb://localhost:27017/wishwish'

  MongoClient.connect(url, (err, db) => {
    if(err) {
      res.status(500).send()
    } else {
      insertUser(db, req.body.user, (err) => {
        db.close()
        if(err) {
          res.status(500).send()
        } else {
          res.status(200).send()
        }
      })
    }
  })
})


app.listen(8080)


// Fonctions
let insertUser = (db, user, callback) => {
  db.collection('user').insertOne(user, (err, result) => {
    if(err) {
      throw err
    } else {
      console.log(user.firstname + " " + user.name + "a bien été enregistré")
    }
    callback()
  })
}
