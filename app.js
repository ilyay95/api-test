const express = require("express");
const Sequelize = require("sequelize");
var app = express();

const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});

const sequelize = new Sequelize("postgres", "postgres", "1234567", {
  dialect: "postgres"
     });
 
// определяем модель User
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

  // синхронизация с бд, после успшной синхронизации запускаем сервер
sequelize.sync().then(()=>{
    app.listen(3000, function(){
      console.log("Сервер ожидает подключения...");
    });
  }).catch(err=>console.log(err));

  // получение данных
app.get("/", function(req, res){
    User.findAll({raw:true}).then(users=>{
        console.log(users);
      }).catch(err=>console.log(err));
});

// добавление данных
app.post("/create", urlencodedParser, function (req, res) {
         
         
    const username = req.body.name;
    const userage = req.body.age;
    User.create({ name: username, age: userage}).then(()=>{
        console.log(res);
    }).catch(err=>console.log(err));
});

// удаление данных
app.post("/delete/:id", function(req, res){  
    const userid = req.params.id;
    User.destroy({where: {id: userid} }).then(() => {
        console.log(res);
    }).catch(err=>console.log(err));
  });