module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    // Giving the Ingredient model a name of type STRING
    name: DataTypes.STRING,
    season: DataTypes.STRING
  });

  return Ingredient;
};
