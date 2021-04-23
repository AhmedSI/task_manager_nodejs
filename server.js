const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to task_manager application."});
});

// import the tasks routes
require('./app/routes/task.routes.js')(app);

// listen for requests
app.listen(process.env.PORT||8080, () => {
    console.log("Server is listening on port 8080");
});