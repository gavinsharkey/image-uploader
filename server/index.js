const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
})

app.use(morgan('tiny'));
app.use(express.json({
  limit: "20mb"
}))
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  res.send({
    status: "Received"
  })
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT);
})

