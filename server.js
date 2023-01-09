const express = require('express');
const exphbs = require('express-handlebars'); 

const app = express();

app.use(express.static(__dirname + '/dist'));

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 