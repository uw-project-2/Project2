/* eslint-disable */

$(document).ready(function () {
  console.log("ready!");

  $.ajax({
    type: "GET",
    url: "/api/ingredients"
  }).then(function (ingredients) {
    var options = ingredients.map(function (ingredient) {
      return `<option value=${ingredient.name}>${ingredient.name}</option>`;
    });
    $("#ingredients").after(`<input list="options" id="test"></input>`);
    $("#test").after(`<datalist id="options">${options}</datalist>`);
  });

  // Get references to page elements
  var $name = $("#name");
  var $ingredients = $("#ingredients");
  var $directions = $("#directions");
  var $submitBtn = $("#submit-btn");
  var $recipeList = $("#recipe-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveRecipe: function (recipe) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/recipes",
        data: JSON.stringify(recipe)
      });
    },
    getRecipes: function () {
      return $.ajax({
        url: "api/recipes",
        type: "GET"
      });
    },
    deleteRecipe: function (id) {
      return $.ajax({
        url: "api/recipes/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshRecipes gets new recipes from the db and repopulates the list
  var refreshRecipes = function () {
    API.getRecipes().then(function (data) {
      var $recipes = data.map(function (recipe) {
        var $a = $("<a>")
          .text(recipe.recipe_name)
          .attr("href", "/recipe/" + recipe.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": recipe.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $recipeList.empty();
      $recipeList.append($recipes);
    });

    // handleFormSubmit is called whenever we submit a new recipe
    // Save the new recipe to the db and refresh the list
    var handleFormSubmit = function (event) {
      event.preventDefault();

      var recipe = {
        recipe_name: $name.val().trim(),
        ingredients: $ingredients.val().trim(),
        directions: $directions.val().trim()
      };

      if (!(recipe.recipe_name && recipe.directions)) {
        alert("You must enter a recipe name, ingredients and directions!");
        return;
      }

      API.saveRecipe(recipe).then(function () {
        refreshRecipes();
      });

      $name.val("");
      $ingredients.val("");
      $directions.val("");
    };

    // handleDeleteBtnClick is called when an recipe's delete button is clicked
    // Remove the recipe from the db and refresh the list
    var handleDeleteBtnClick = function () {
      var idToDelete = $(this)
        .parent()
        .attr("data-id");

      API.deleteRecipe(idToDelete).then(function () {
        refreshRecipes();
      });
    };

    // Add event listeners to the submit and delete buttons
    $submitBtn.on("click", handleFormSubmit);
    $recipeList.on("click", ".delete", handleDeleteBtnClick);
  };
});