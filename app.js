const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
const routes = require('./routes/index')

app.get('/', routes.routerCheck)
app.post('/action', routes.routerAction)

app.listen(5000, () => console.log('Example app listening on port 5000!'))
