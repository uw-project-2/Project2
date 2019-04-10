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
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      //create a sequelize where condition query to build an array of keys with ingredient IDs in the recipe
      var recipeIngredients = JSON.parse(dbRecipe.ingredients);

      // Creates a new array of just ingredient id's.
      var recipeIngredientIds = recipeIngredients.map(function(ingredientObj) {
        return parseInt(ingredientObj.ingredients); // '.ingredients' is actually the id of this ingredient.
      });

      db.Ingredient.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: recipeIngredientIds
          }
        }
      }).then(function(dbIngredients) {
        const fullIngredientList = [];
        dbIngredients.forEach(ingredient => {
          // sync each ingredient with recipe ingredient
          recipeIngredients.forEach(recipeIngredient => {
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
        // Overwrite recipe ingredients array with the full list of ingredients i.e. includes the ingredient info plus the recipe amount.
        dbRecipe.ingredients = fullIngredientList;
        res.render("example", {
          recipe: dbRecipe
        });
      });
    });
  });

  // Load ingredient page and pass in ingredients by season
  app.get("/ingredients/:season", function(req, res) {
    if (req.params.season) {
      db.Ingredient.findAll({
        where: {
          season: req.params.season
        }
      }).then(function(dbIngredient) {
        res.render("ingredients", {
          ingredients: dbIngredient
        });
      });
    }
  });

  app.get("/recipes/:ingredient_id", function(req, res) {
    if (req.params.ingredient_id) {
      var recipeArray = [];
      db.Recipe.findAll({}).then(function(dbRecipes) {
        dbRecipes.forEach(function(recipe) {
          JSON.parse(recipe.dataValues.ingredients).forEach(function(
            ingredient
          ) {
            if (ingredient.ingredients === parseInt(req.params.ingredient_id)) {
              recipeArray.push(recipe);
            }
          });
        });
        // res.json(recipeArray);
        res.render("recipes", {
          recipes: recipeArray
        });
      });
    }
  });

  app.get("/addRecipe", function(req, res) {
    res.render("addRecipe");
  });

  app.get("/addIngredient", function(req, res) {
    res.render("addIngredient");
  });

  app.get("/aboutus", function(req, res) {
    res.render("aboutus");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
