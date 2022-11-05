const fs = require('fs')
// configure dotenv and port

const port = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

const info = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/info.json`)
)

app.get('/api/v1/info', (req, res) => {
    res.status(200).json(info)
})

app.post('/api/v1/info', (req, res) => {
    
    const { operation_type, x, y } = req.body
 
    const operationTypes =[ "addition", "subtraction", "multiplication" ]


    operationTypes.includes(operation_type.toString().toLowerCase())

    if (isNaN(x)) {
        return res.status(400).send("X is invalid.");
    }

    if (isNaN(y)) {
        return res.status(400).send("Y is invalid.");
    }

    let result = 0

   if (operation_type == 'addition') {
    result = x + y;
   }

   if (operation_type == 'subtraction') {
    result = x - y;
   }

   if (operation_type == 'multiplication') {
    result = x * y;
   }

  let response ={
    slackUsername: 'preshh0',
    operation_type: operation_type.toString().toLowerCase(),
    result
  };

  return res.status(200).send(response);
})

// const port = 3000;
app.listen(port, () => {
    console.log(`App running on ${port}...`)
});