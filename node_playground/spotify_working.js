
//-----------------------------------------------------------------------------------
//  spotify api try
const express = require('express');
const bodyParser= require('body-parser');
const https = require('https');

const ClientId="Client Id";
const ClientSecret="Client Secret Id";

const axios = require('axios');

const app= express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));


app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + ClientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent("http://localhost:3000/redirect"))

})

//-- -------------------------step 2 : i.e to get the token---------------------------------------------------------


var qs = require('qs');

let accessToken="";
let refreshToken="";
let initial_code="";

app.get("/redirect", function(req,res){ // redirection url
    res.send("hi");
    initial_code =req.query.code;
    console.log("initial code is "+initial_code);

// --------------------------------------------------------------------------------
// getting token is inside the get request of login request. when login will be triggered then only token will be triggered.
    
    let data = qs.stringify({
        'grant_type': 'authorization_code',
       'code': initial_code ,
       'redirect_uri': 'http://localhost:3000/redirect' 
       });
       
       let config={
           method: 'post',
         url: 'https://accounts.spotify.com/api/token',
         headers: { 
           'Authorization': 'Basic "Base64code"=', 
           'Content-Type': 'application/x-www-form-urlencoded', 
           'Cookie': '__Host-device_id=AQBg2MLobjYC3zoZF-0_-b3ne5Eo2oxjvjmrkJoId-XiSSf_hhlBDK5gg7xE9rVYyPpCYV8zGpn4QBwFWlhlUeJg4xzmKGPS49I'
         },
         data : data
       };

    axios(config)
    .then(tokenResponse =>{
    // console.log(tokenResponse.data.access_token);
    accessToken=tokenResponse.data.access_token;
    refreshToken=tokenResponse.data.refresh_token;
    console.log ("access token= "+ accessToken);
    console.log ("refresh token= "+ refreshToken);
    })
    .catch(function (error) {
        console.log(error.message);
    });


  
// ----------------------------------------------------------------------------------------------
});

//--------------------------------------------------------------------------------------------------------------------
// step 3 to get the data

  var result={};

  app.get("/data",(req,res)=>{

    console.log("accessToken= "+accessToken);
    
    let config = {
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
          'Authorization': "Bearer " + accessToken
        }
      };
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        result=JSON.stringify(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });

      res.send(result);
  })
//--------------------------------------------------------------------------------------


//---getting album data from the API------------------------------------------------------
id="22bE4uQ6baNwSHPVcDxLCe"; // id for rolling stones album
let api_data="";
app.get("/albums",(req,res)=>{
  let config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?market=ES&limit=10&offset=1',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization':"Bearer " + accessToken
    }
  };
  
  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    api_data=JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error.message);
  });

  res.send(api_data);

})





// spotify home page
app.get("/",(req, res)=>{
  res.sendFile(__dirname+'/index.html');
} )

    
app.listen(3000, function(){
    console.log("Server is running perfectly");
});


// curl -H "Authorization: Basic =" -d grant_type=authorization_code -d code=AQBWE6yH5vvdtC-- -d redirect_uri=http%3A%2F% https://accounts.spotify.com/api/token

// curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist"

