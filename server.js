let express = require('express')
let app = express()

// Moteur de template
app.set('view engine', 'ejs')

//Middlewares
app.use('/public', express.static('public'))
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))
app.use('/jquery', express.static('node_modules/jquery/dist'))

//Routes
app.get('/', (req, res) => {
  res.render('connection')
})

app.get('/registration', (req, res) => {
  res.render('registration')
})

app.listen(8080)
