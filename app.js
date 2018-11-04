const express = require('express')
const path = require('path')
// Init App
const app = express()

// Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/static', express.static('public'))

// Home Route
app.get('/', function(req, res) {
  let articles = [
    {
      id: 1,
      title: 'Article One',
      author: 'Brad Traversy',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article two',
      author: 'Brad Traversy',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article Three',
      author: 'Brad Traversy',
      body: 'This is article Three'
    },
    {
      id: 4,
      title: 'Article Three',
      author: 'Brad Traversy',
      body: 'This is article Three'
    }
  ]
  res.render('index', {
    title: 'hello',
    articles: articles
  })
})

// Add Route
app.get('/articles/add', function(req, res) {
  res.render('add_article', {
    title: 'Add Article'
  })
})

// Start Server
app.listen(3000, function() {
  console.log('we are listening on port 3000')
})
