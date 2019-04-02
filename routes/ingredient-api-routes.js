var db = require("../models");

var seasonalFoods = require("../models/seasonal.js");


module.exports = function(app) {
  
  //displays seasonal food from seaonal.js
  app.get("/api/seasonal", function (req, res) {
    res.json(seasonalFoods);
  });


  app.get("/api/ingredients", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Recipe
    db.Ingredient.findAll({
      include: [db.Recipe]
    }).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.get("/api/ingredients/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Recipe
    db.Ingredient.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Recipe]
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
