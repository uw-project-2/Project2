var db = require("../models");

module.exports = function(app) {
  app.get("/api/ingredients", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Recipe
    db.Ingredient.findAll({}).then(function(dbIngredient) {
      res.json(dbIngredient);
    });
  });

  app.get("/api/season/:season", function(req, res) {
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
    // TODO:Not sure that we need this
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

  // app.post("/api/new", function(req, res) {
  //   db.Recipe.create({
  //     name: req.body.recipe_name
  // //  photo: req.body.image
  //     ingredients: req.body.ingredients.name
  //     directions: req.body.directions
  //   }).then(function(dbRecipe) {
  //     res.json(dbRecipe);
  //   });
  // });

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
