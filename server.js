const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const session = require('express-session');
const routes = require('./routes/index');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'mustache');
app.set('layout', 'layout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(morgan('dev'));


app.use(session({
  secret: "heyyy",
  resave: false,
  saveUninitialized: false,
}));

app.use(routes);

app.listen(3000, function(){
  console.log("RUNNING on localhost: 3000");
});




// router.post("/", function(req, res) {
//   req.checkBody('username').notEmpty();
//   req.checkBody('username').isLength(min: 8, max: 25);
//   req.checkBody('username').isAplhanumeric();
//
//   req.checkBody('password').notEmpty();
//   req.checkBody('password').isLength(min: 8, max: 25);
//
//   let errors = req.getValidationResult();
//   let messages = [];
//   let obj = {
//     user: req.body.username,
//     password: req.body.password
//   };
//   res.render('results', obj);
// });
