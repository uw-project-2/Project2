module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    // Giving the Ingredient model a name of type STRING
    name: DataTypes.STRING,
    season: DataTypes.STRING
  });

  //Instead of associating the tables via sequalize TODO: just use separate queries when pulling recipes or pulling ingredients for a specific recipe
  // Ingredient.associate = function(models) {
  //   // Associating Ingredient with Recipes
  //   // When an Ingredient is deleted, also delete any associated Recipes
  //   Ingredient.hasMany(models.Recipe, {
  //     onDelete: "cascade"
  //   });
  // };

  return Ingredient;
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
