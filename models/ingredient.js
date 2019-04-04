module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    // Giving the Ingredient model a name of type STRING
    name: DataTypes.STRING,
    season: DataTypes.STRING
  });

  // Ingredient.associate = function(models) {
  //   // Associating Ingredient with Recipes
  //   // When an Ingredient is deleted, also delete any associated Recipes
  //   Ingredient.hasMany(models.Recipe, {
  //     onDelete: "cascade"
  //   });
  // };

  return Ingredient;
};
