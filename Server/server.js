var express = require('express');  
var app = express();  
var db =  require('./database');

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/movies',async(req,res,next)=>{
    // testing res.send('get method triggered');
    try{
      const data = await db.getMovieNames();
      res.send(data);
    }catch(e){
      console.log(e);
    }
  });


app.post('/insertMovies', async(req, res, next)=>{
    console.log("inside inserMovies");
    try{
      const data = await db.addMovie(req.body);
      res.send(data);
    }catch(exception){
      console.log(exception);
    }
  })


app.listen(8080, ()=>{
    console.log(`server started listining on 8080`);
   
  });  