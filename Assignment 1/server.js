const express = require('express')
const app = express()
app.set('view engine', 'ejs');


app.listen(5000, function (err) {
    if (err)
        console.log(err);
})  

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage</h1>')
// })

app.get('/profile/:id', function (req, res) {
    // req.params.id
    console.log(req)
    // res.write(`<h1> This pokemon has id: ${req.params.id}</h1>`)
    // res.send();
    res.render("profile.ejs", {
        "id": req.params.id
    })
})
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })

app.use(express.static('./public'));