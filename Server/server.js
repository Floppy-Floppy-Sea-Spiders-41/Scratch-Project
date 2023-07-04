const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controllers/controller.js');
const PORT = 3000;

app.use(express.json());
// if you ever have a form on your frontend, express.urlencoded
app.use(express.urlencoded({ extended: true })); // this will be helpful for stringifying a form req from an .html file


app.post('/api', controller.getStretches, (req, res) => {
    return res.status(200).json(res.locals.apiRes);
    
});


//REPLACE THIS WITH A NICE 404 PAGE
app.get('*', (req, res) => {
    res.send('API RUNNING!')
})
// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})


// listener

app.listen(PORT, () => console.log(`listening on ${PORT}`));
