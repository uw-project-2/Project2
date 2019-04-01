var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Ingredient.findAll({
      include: [db.Post]
    }).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.get("/api/ingredients/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Ingredient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.post("/api/ingredients", function(req, res) {
    db.Ingredient.create(req.body).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.delete("/api/ingredients/:id", function(req, res) {
    db.Ingredient.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

};
