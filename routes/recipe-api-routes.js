var db = require("../models");

module.exports = function(app) {
  app.get("/api/recipes", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Recipe
    db.Recipe.findAll({}).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // GET route for getting all of the recipes
  // app.get("/api/recipes", function(req, res) {
  //   var query = {};
  //   if (req.query.recipe_id) {
  //     query.RecipeId = req.query.recipe_id;
  //   }
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Ingredient
  //   db.Recipe.findAll({
  //     where: query
  //   }).then(function(dbRecipe) {
  //     res.json(dbRecipe);
  //   });
  // });

  // Get route for retrieving a single recipe
  app.get("/api/recipes/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Ingredient
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
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

  // POST route for image URL
  app.post('/api/recipes/:image', function(req, res) {
    if (Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv("/somewhere/on/your/server/filename.jpg", function(err) {
      if (err) {return res.status(500).send(err);
      }
      res.send("File uploaded!");
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

// //------------------------------------------------------------------------

// // TODO: QUERY RECIPES
// var recipeIngredients =
//   "[{ \"id\": 1, \"amount\": \"2 cups\"}, { \"id\": 2, \"amount\": \"1 cups\" }]";

// recipeIngredients = JSON.parse(recipeIngredients);

// // TODO: QUERY INGREDIENTS TABLE with recipe's ingredient id's.
// var query = "SELECT * FROM ingredients WHERE ";
// recipeIngredients.forEach(function(ingredient) {
//   query += "id=" + ingredient.id + " OR ";
// });

// console.log(query);
// // imagine query ^ retrieving ingredients from the db:
// // TODO: ACTUALLY get this array of ingredients from the db via the above query.
// // from db.ingredients
// var dbIngredient = [
//   {
//     id: 1,
//     name: "Salt",
//     season: "all"
//   },
//   {
//     id: 2,
//     name: "Watermelon",
//     season: "summer"
//   }
// ];

// dbIngredient = dbIngredient.map(function(ingredient) {
//   for (var i = 0; i < recipeIngredients.length; i++) {
//     if (ingredient.id === recipeIngredients[i].id) {
//       ingredient.amount = recipeIngredients[i].amount;
//     }
//   }
//   return ingredient;
// });

// console.log(dbIngredient);
