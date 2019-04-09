var db = require("../models");

var multer = require("multer");
//var path = require("path");

//var upload = multer({ dest: "./public/uploads" });
var upload = multer({ dest: "public/uploads" });

// var upload = multer({ storage: storage });
//
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

module.exports = function(app) {
  app.get("/api/recipes", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // In this case, just db.Recipe
    db.Recipe.findAll({}).then(function(dbRecipe) {
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
      }
      //include: [db.Ingredient]
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  //FIXME: Do I need to set parameters to ingredients?
  // If user searches by name of ingredient grab all recipes with that ingredient
  // app.get("/api/recipes/:name", function(req, res) {
  //   if (req.params.recipe_name) {
  //     db.Recipe.findAll({
  //       where: {
  //         recipe_name: req.params.recipe_name
  //       }
  //     }).then(function(dbRecipe) {
  //       res.json(dbRecipe);
  //     });
  //   }
  // });

  // POST route for saving a new recipe
  app.post("/api/recipes", upload.single("recipeImage"), function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    console.log(req.file);

    const recipe = req.body;
    recipe.recipeImage = req.file.filename;

    db.Recipe.create(recipe).then(function(dbRecipe) {
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
