var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Recipe.findAll({}).then(function (dbRecipes) {
      res.render("index", {
        recipes: dbRecipes
      });
    });
  });

  // Load recipe page and pass in a recipe by id
  app.get("/recipe/:id", function (req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbRecipe) {
      //console.log(dbRecipe.ingredients);
      //create a sequelize where condition query to build an array of keys with ingredient IDs in the recipe
      var ingredients = JSON.parse(dbRecipe.ingredients);
      //TODO: create parse int for the ingredient id
      //   , function(key, value) {
      //   ingredients.parseInt("ingredients:");
      //   if (key == "ingredients:") return new Number(value);
      //   return value;
      // });
      //var ingredientsInt = JSON.parseInt("ingredients");
      // void setup() {`
      //   json = loadJSONObject(dbRecipe.ingredients);
      //   int ingredients = jsonObj.getInt("ingredients")
      // }

      var ingredientID = ingredients.map(function (ingredient) {
        return ingredient.ingredients;
      });

      db.Ingredient.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: ingredientID
          }
        }
      }).then(function (result) {
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
        res.render("example", {
          recipe: dbRecipe,
          ingredients: fullIngredientList
        });
      });
    });
  });

  // Load ingredient page and pass in ingredients by season
  app.get("/ingredients/:season", function (req, res) {
    if (req.params.season) {
      db.Ingredient.findAll({
        where: {
          season: req.params.season
        }
      }).then(function (dbIngredient) {
        res.render("example", {
          ingredients: dbIngredient
        });
      });
    }
  });

  //FIXME: Ensure this is working properly
  // Load all recipes associated with a specific ingredient
  // app.get("/recipes/:ingredient_id", function (req, res) {
  //   if (req.params.ingredient_id) {
  //     db.Recipe.findAll({
  //       where: {
  //         ingredients: {
  //           [db.Sequelize.Op.like]: `%${req.params.ingredient_id}%`
  //         }
  //       }
  //     }).then(function (dbRecipes) {
  //       console.log(dbRecipes);
  //       res.render("example", {
  //         recipes: dbRecipes
  //       });
  //     });
  //   }
  // });



  app.get("/recipes/:ingredient_id", function (req, res) {
    if (req.params.ingredient_id) {
      db.Recipe.findAll({
        where: {
          ingredients: req.params.ingredient_id
        }
        // where: {
        //   ingredients: {
        //     [db.Sequelize.Op.like]: `%${req.params.ingredient_id}%`
        //   }
        // }
      }).then(function (dbRecipe) {
        //console.log(dbRecipe.ingredients);
        //create a sequelize where condition query to build an array of keys with ingredient IDs in the recipe
        var ingredients = JSON.parse(dbRecipe.ingredients);

        var ingredientID = ingredients.map(function (ingredient) {
          return ingredient.ingredients;
        });

        db.Ingredient.findAll({
          where: {
            id: {
              [db.Sequelize.Op.in]: ingredientID
            }
          }
        }).then(function (result) {
          const fullRecipeList = [];
          result.forEach(ingredient => {
            console.log(ingredient);
            ingredients.forEach(recipeIngredient => {
              console.log(recipeIngredient);
              if (ingredient.id === recipeIngredient.ingredients) {
                fullRecipeList.push({
                  id: ingredient.id,
                  name: ingredient.name
                });
              }
            });
          });
          console.log(fullRecipeList);
          res.render("example", {
            recipe: dbRecipe,
            ingredients: fullRecipeList
          });
        });
      });
    }
  });























  app.get("/addRecipe", function (req, res) {
    res.render("addRecipe");
  });

  app.get("/addIngredient", function (req, res) {
    res.render("addIngredient");
  });

  app.get("/aboutus", function(req, res) {
    res.render("aboutus");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};