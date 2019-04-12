var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    //finding all fo the ingredients
    // Here we add an "include" property to our options in our findAll query
    db.Ingredient.findAll({}).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.get("/api/season/:season", function(req, res) {
    //finding all the ingredients by season
    // If user searches by season grab all ingredients in that season
    if (req.params.season) {
      db.Ingredient.findAll({
        where: {
          season: req.params.season
        }
      }).then(function(dbIngredient) {
        res.json(dbIngredient);
      });
    }
  });

  app.get("/api/season/", function(req, res) {
    // Find all seasons
    db.Ingredient.findAll({}).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.get("/api/name/:name", function(req, res) {
    // Find ingredients by ingredient name when users searches for name
    if (req.params.name) {
      db.Ingredient.findAll({
        where: {
          name: req.params.name
        }
      }).then(function(dbIngredient) {
        res.json(dbIngredient);
      });
    }
  });

  app.get("/api/ingredients/:id", function(req, res) {
    // Find ingredients by unique identifier
    db.Ingredient.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  // POST route for saving a new ingredient
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
