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
    }
    // ,
    // image: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   len: [1]
    // }
  });

  //Instead of associating the tables via sequalize TODO: just use separate queries when pulling recipes or pulling ingredients for a specific recipe
  // Recipe.associate = function(models) {
  //   // We're saying that a Recipe should have an Ingredient
  //   // A Recipe can't be created without an Ingredient due to the foreign key constraint
  //   Recipe.belongsTo(models.Ingredient, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Recipe;
};
