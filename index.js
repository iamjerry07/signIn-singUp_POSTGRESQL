const express = require('express')
const route = require('./route.js');

const app = express()
const port = process.env.PORT || 3000

app.use('/', route);

 
app.listen(port, () => console.log(`backend app listening on port ${port}!`))