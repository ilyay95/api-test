const Sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const sequelize = new Sequelize("postgres", "postgres", "1234567", {
  dialect: "postgres"
});


const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

User.create({
  name: "Tom",
  age: 35
}).then(res=>{
  console.log(res);
}).catch(err=>console.log(err));

sequelize.sync().then(()=>{
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));

app.get("/", function(req, res){
  User.findAll({raw:true}).then(users=>{
    console.log(users);
  }).catch(err=>console.log(err));
});

app.post("/api/users", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
       
  const username = req.body.name;
  const userage = req.body.age;
  User.create({ name: username, age: userage}).then(()=>{
    res.redirect("/");
  }).catch(err=>console.log(err));
});


app.post("api/users/:id", function(req, res){  
  const userid = req.params.id;
  User.destroy({where: {id: userid} }).then(() => {
    res.redirect("/");
  }).catch(err=>console.log(err));
});