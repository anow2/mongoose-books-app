// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var db = require('./models')

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////

// var books = [
//   {
//     _id: 15,
//     title: "The Four Hour Workweek",
//     author: "Tim Ferriss",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
//     release_date: "April 1, 2007"
//   },
//   {
//     _id: 16,
//     title: "Of Mice and Men",
//     author: "John Steinbeck",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
//     release_date: "Unknown 1937"
//   },
//   {
//     _id: 17,
//     title: "Romeo and Juliet",
//     author: "William Shakespeare",
//     image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
//     release_date: "Unknown 1597"
//   }
// ];


// var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
  console.log("helo");
});

// get all books -DONE
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books){
    if (err) { return console.log("index error: " + err); }
    res.json(books);
  });
});


// get one book -DONE
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var bookId = req.params.id;
  db.Book.findOne({_id: bookId}, function(err, foundBook) {
    res.json(foundBook);
   });
 });


// create new book - DONE
app.post('/api/books', function(req, res) {
  var newBook = new db.Book(req.body);
  newBook.save(function(err, savedBook) {
    res.json(savedBook);
  });
});

// update book - DONE

app.put('/api/books/:id', function(req, res) {
  // get todo id from url params (`req.params`)
  var bookId = req.params.id;

  // find todo in db by id
  db.Book.findOne({ _id: bookId }, function(err, foundBook) {
    // update the todos's attributes
    foundBook.author = req.body.author;
    foundBook.title = req.body.title;

    // save updated todo in db
    foundBook.save(function(err, savedBook) {
      res.json(savedBook);
    });
  });
});


// delete book - DONE
 app.delete('/api/book/:id', function(req, res) {
   // get todo id from url params (`req.params`)
   var bookId = req.params.id;

   // find todo in db by id and remove
   db.Book.findOneAndRemove({ _id: bookId }, function(err, deletedBook) {
     res.json(deletedBook);
   });
 });




app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
