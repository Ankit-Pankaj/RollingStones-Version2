
//-----------------------------------------------------------------------------------
//  spotify api try
const express = require('express');
const bodyParser= require('body-parser');
const https = require('https');


const axios = require('axios');

const app= express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));



app.listen(3000, function(){
    console.log("Server is running perfectly");
});


