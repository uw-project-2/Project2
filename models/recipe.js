/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    recipeImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    }
  });

  return Recipe;
};
