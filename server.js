/* eslint-disable no-undef */
const express = require('express');
const path = require('path');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/*', ( _, res) => {
  console.log(res);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
