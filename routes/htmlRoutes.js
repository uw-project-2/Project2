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
<<<<<<< HEAD
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      dbRecipe
    ) {
      console.log(dbRecipe.ingredients);
=======
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      //console.log(dbRecipe.ingredients);
>>>>>>> bb0ce2c400df52fea6c5b4fedff4e8927d9dbac5
      //create a sequelize where condition query to build an array of keys with ingredient IDs in the recipe
      var ingredients = JSON.parse(dbRecipe.ingredients);

<<<<<<< HEAD
      //run another loop through all ingredients to add the name property
=======
      var ingredientID = ingredients.map(function(ingredient) {
        return ingredient.ingredients;
      });
      //run another loop through all ingredients to add the name property

      db.Ingredient.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: ingredientID
          }
        }
      }).then(function(result) {
        const fullIngredientList = [];
        result.forEach(ingredient => {
          console.log(ingredient);
          ingredients.forEach(recipeIngredient => {
            console.log(recipeIngredient);
            if (ingredient.id === recipeIngredient.ingredients) {
              fullIngredientList.push({
                id: ingredient.id,
                name: ingredient.name,
                season: ingredient.season,
                amount: recipeIngredient.amount
              });
            }
          });
        });
        console.log(fullIngredientList);
      });
>>>>>>> bb0ce2c400df52fea6c5b4fedff4e8927d9dbac5

      res.render("example", {
        recipe: dbRecipe
      });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
      res.render("404");
    });
  });
};
