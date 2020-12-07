const express = require("express");
const bodyParser = require("body-parser");
const User = require('./models/index');

var app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen(3000, () => {
   console.log(`Express server listening on port 3000...`);
});

 
app.get("/users", function(req, res){
    User.findAll({raw:true}).then(users=>{
        res.send(users);
      }).catch(err=>console.log(err));
});


app.post("/create", urlencodedParser, function (req, res) {  
    const username = req.body.name;
    const userage = req.body.age;

    User.create({ name: username, age: userage}).then(()=>{
      res.send();
    }).catch(err=>console.log(err));
});

app.post("/create/tom", urlencodedParser, function (req, res) {
    User.create({
        name: "Tom",
        age: 35
      }).then(res=>{
        res.send();
      }).catch(err=>console.log(err));
});


app.post("/delete/:id", function(req, res){  

    const userid = req.params.id;

    User.destroy({where: {id: userid} }).then(() => {
      res.send();
    }).catch(err=>console.log(err));
  });

  module.exports.app = app;
