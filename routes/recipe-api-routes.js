var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the recipes
  app.get("/api/recipes", function(req, res) {
    var query = {};
    if (req.query.recipe_id) {
      query.RecipeId = req.query.recipe_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Ingredient
    db.Recipe.findAll({
      where: query,
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get route for retrieving a single recipe
  app.get("/api/recipes/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Ingredient
    db.Recipe.findOne({
      where: {
        id: req.params.id
      },
      //include: [db.Ingredient]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // POST route for saving a new recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting recipes
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // PUT route for updating recipes
  app.put("/api/recipes", function(req, res) {
    db.Recipe.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
};
