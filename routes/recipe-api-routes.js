var db = require("../models");
//used for adding an upload image function for users when adding recipes
var multer = require("multer");

//Destination folder for image uploads
var upload = multer({ dest: "public/uploads" });

module.exports = function(app) {
  app.get("/api/recipes", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    db.Recipe.findAll({}).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get route for retrieving a single recipe
  app.get("/api/recipes/:id", function(req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // POST route for saving a new recipe and adding an image to uploads folder
  app.post("/api/recipes", upload.single("recipeImage"), function(req, res) {
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
