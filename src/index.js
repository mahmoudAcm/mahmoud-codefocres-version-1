const express = require('express');
const path = require('path');
const status = require('./libs/solved');
const code = require('./libs/getSubmitionCode');

const app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
const port = process.env.PORT || 3000

app.post('/status', (req, res) => {
    status(req.body.handle, req.body.search).then((data) => {
        res.send(data);
    })
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});