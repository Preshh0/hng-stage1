const fs = require('fs')
const express = require('express');
const cors = require('cors')

const app = express();
/*
app.get('api/v1/info', (req, res) => {

})
is called a route handler
*/

app.use(cors())

const info = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/info.json`)
)

app.get('/api/v1/info', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            info
        }
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on ${port}...`)
});