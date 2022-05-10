const express = require('express')
const app = express()
app.set('view engine', 'ejs');
//mongoose
const mongoose = require('mongoose');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage </h1>')    
// })

mongoose.connect("mongodb://localhost:27017/timelineevents",
 {useNewUrlParser: true, useUnifiedTopology: true});
const timelineSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
});

const timelineModel = mongoose.model("timelineevents", timelineSchema);

app.get('/timeline', function(req, res) {
    timelineModel.find({}, function(err, timelineEvents){
        if (err){
          console.log("Error " + err);
        }else{
          console.log("Data "+ JSON.stringify(timelineEvents));
        }
        res.send(JSON.stringify(timelineEvents));
    });
  })

  app.get('/timeline', function(req, res) {
    cityModel.find({}, function(err, timelineEvents){
        if (err){
          console.log("Error " + err);
        }else{
          console.log("Data "+ JSON.stringify(timelineEvents));
        }
        res.send(JSON.stringify(timelineEvents));
    });
  })


const https = require('https');
app.get('/profile/:id', function (req, res) {
    
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })
        
        https_res.on("end", function () {
            data = JSON.parse(data)
            
            hpPoke = data.stats.filter((obj_)=>{
                return obj_.stat.name == "hp"
            }).map((obj2)=>{
                return obj2.base_stat
            })
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": hpPoke[0],
                "imagePoke": data.sprites.other["official-artwork"]["front_default"],
                "type": data.types[0].type.name,
                "weight": data.weight
            });
        })
    });
   
    console.log(data);
   
})

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })

app.use(express.static('./public'));