var db = require("../models");
//FIXME:We don't have a Data file.  Where is this?
var seasonalFoods = require("../data/seasonalFoods.js");


module.exports = function(app) {
  //displays seasonal food from seaonal.js
  app.get("/api/seasonalFoods", function(req, res) {
    res.json(seasonalFoods);
  });
  };
// ---------------------------------------------------------------------------

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
