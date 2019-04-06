var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
        recipes: dbRecipes
      });
    });
  });

  // Load recipe page and pass in a recipe by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      dbRecipe
    ) {
      console.log(dbRecipe.ingredients);
      //create a sequelize where condition query to build an array of keys with ingredient IDs in the recipe

      //run another loop through all ingredients to add the name property

      res.render("example", {
        recipe: dbRecipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
