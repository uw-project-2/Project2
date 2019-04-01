module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Recipe.associate = function(models) {
    // We're saying that a Recipe should have an Ingredient
    // A Recipe can't be created without an Ingredient due to the foreign key constraint
    Recipe.belongsTo(models.Ingredient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};


//------------------------------------------------------------------------



// TODO: QUERY RECIPES
var recipeIngredients = '[{ "id": 1, "amount": "2 cups"}, { "id": 2, "amount": "1 cups" }]';

recipeIngredients = JSON.parse(recipeIngredients);

// TODO: QUERY INGREDIENTS TABLE with recipe's ingredient id's.
var query = "SELECT * FROM ingredients WHERE ";
recipeIngredients.forEach(function(ingredient) {
  query += "id=" + ingredient.id + " OR ";
})

console.log(query)
// imagine query ^ retrieving ingredients from the db:
// TODO: ACTUALLY get this array of ingredients from the db via the above query.
// from db.ingredients
var dbIngredient = [{
  id: 1,
  name: "Salt",
  season: "all"
}, {
  id: 2,
  name: "Watermelon",
  season: "summer"
}]

dbIngredient = dbIngredient.map(function(ingredient) {
  for (var i=0; i<recipeIngredients.length; i++) {
    if (ingredient.id === recipeIngredients[i].id) {
     ingredient.amount = recipeIngredients[i].amount; 
    }
  }
  return ingredient;
})

console.log(dbIngredient)