const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");


var app = express();
const db = new Sequelize("postgres", "postgres", "1234567", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false
  }
});


app.listen(3000, () => {
   console.log(`Express server listening on port 3000...`);
});

 
app.get( "/posts", (req, res) =>
db.post.findAll().then( (result) => res.json(result) )
);

app.get( "/post/:id", (req, res) =>
db.post.findByPk(req.params.id).then( (result) => res.json(result))
);

app.post("/post", (req, res) => 
db.post.create({
  title: req.body.title,
  content: req.body.content
}).then( (result) => res.json(result) )
);

app.put( "/post/:id", (req, res) =>
db.post.update({
  title: req.body.title,
  content: req.body.content
},
{
  where: {
    id: req.params.id
  }
}).then( (result) => res.json(result) )
);

app.delete( "/post/:id", (req, res) =>
db.post.destroy({
  where: {
    id: req.params.id
  }
}).then( (result) => res.json(result) )
);
  module.exports.app = app;
