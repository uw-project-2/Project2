var db = require("../models");

module.exports = function(app) {
  app.get("/api/recipes", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
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

  // POST route for image URL===========================
  //   app.post('/api/recipes/:image', function(req, res) {
  //       if (!req.files)
  //         return res.status(400).send('No files were uploaded.');

  //       var file = req.files.uploaded_image;
  //       var img_name = file.name;

  //       if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
  //         file.mv('public/images/upload_images/' + file.name, function(err) {

  //           if (err) return res.status(500).send(err);

  //           var sql = "INSERT INTO `users_image`(`image`) VALUES ('" + img_name + "')";
  //           var query = db.query(sql, function(err, result) {
  //             res.redirect('profile/' + result.insertId);
  //           });
  //         });
  //       } else {
  //         message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
  //         res.render('index.ejs', {
  //           message: message
  //         });
  //     } else {
  //       res.render('index');
  //   }
  // })
  // END route for image URL===========================

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
