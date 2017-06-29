var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

// Create an instance of the express function
var app = express()

var appState = {
    bills: []
}

// We want our html files to be ejs instead
app.set('view engine', 'ejs')

// Serve static content
// Everything the user will see can be found in the views folder
app.use(express.static('views'))
app.use(logger('dev'))

// Gives the server access to user input
// Passes info through a url and it's encoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.set('views', __dirname + '/views')

app.get('/', function(request, response){
    response.render('home.ejs')
})



app.post('/bill', function(request, response){
    var str = request.body.search
    
    // var searchTerm = `q=${str.replace(" ","+")}&`;
    var endpoint =`https://api.propublica.org/congress/v1/bills/subjects/${str}.json`
    var apiKey = 'J9COAqTYDG8ja89ZMPzFT3i9oKyCyF089Z94KU1R'    
    
    axios.get(endpoint, {
        headers: {
            'X-API-Key':  apiKey
        }        
    })
    .then(res => { return res.data.results })
    .then(json => {
        // console.log(json)
        
        response.render('results.ejs', {bills: json})
    })
    .catch(err => console.log(err))
})

app.get('/get-billz', function(request,response){
    response.render('bill.ejs')
})

app.get('/getInvolved', function(request, response){
    response.render('getInvolved.ejs');
})

app.get('/findReps', function(request, response){
    response.render('findReps.ejs');
})

app.post('/single-bill', function(request, response){
    var endpoint = request.body.bill_uri
    
    // var searchTerm = `q=${str.replace(" ","+")}&`;
    // var endpoint =`https://api.propublica.org/congress/v1/bills/subjects/${str}.json`
    var apiKey = 'J9COAqTYDG8ja89ZMPzFT3i9oKyCyF089Z94KU1R'    
    
    axios.get(endpoint, {
        headers: {
            'X-API-Key':  apiKey
        }        
    })
    // .then(res => { return res.data.results })
    .then(res => {
        var stuffIWant = res.data
        if (!stuffIWant.results) {
            console.log('res.data is ' + stuffIWant)
            response.render('singleBill.ejs', {singleData: stuffIWant, data: null})
        }
        console.log(Object.keys(stuffIWant.results[0]))
        response.render('singleBill.ejs', {singleData: null, data: stuffIWant.results[0]})
    })
    .catch(err => console.log(err))    
})

// app.get('/other-route', function(req, res){
//     response.render('other.ejs')
// })

var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('App running on port ' + port)
})