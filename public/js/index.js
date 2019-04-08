/* eslint-disable */

$(document).ready(function () {
  console.log("ready!");

  // Get references to page elements and declare global ariables
  var $name = $("#name");
  var $amount = $("#amount");
  var $directions = $("#directions");
  var $submitBtn = $("#submit-btn");
  var $recipeList = $("#recipe-list");
  var $ingredient;
  //ingredients array to push the ingredient objects (ingredient and amount) into
  var ingredientsArray = [];

  //========= AJAX call to create the ingredients dropdown in the "new recipe" form ==========//
  $.ajax({
    type: "GET",
    url: "/api/ingredients"
  }).then(function (ingredients) {
    // console.log("Making AJAX call");
    var options = ingredients.map(function (ingredient) {
      // return `<option id="ingredient-select" value="${ingredient.name}">${ingredient.id}</option>`;
      return `<option id="ingredient-select" value="${ingredient.id}">${ingredient.name}</option>`;
    });
    $("#ingredients").append(`<input class="form-control" aria-describedby="ingredients" list="options" id="ingredients-dropdown"></input>`);
    $("#ingredients-dropdown").after(`<datalist id="options">${options}</datalist>`);

    $ingredient = $("#ingredients-dropdown");
  });


  var addToIngredients = function () {
      //grab ID of the previously selected ingredient
      console.log("PRINTING INGREDIENT VALUE");
      console.log($ingredient.val());
      var ingredientSelect = $ingredient.val();

      console.log("PRINTING AMOUNT");
      console.log($amount.val());

      var ingredientObj = {
        ingredients: ingredientSelect,
        amount: $amount.val()
      };

      ingredientsArray.push(ingredientObj);
      console.log("PRINTING INGREDIENT ARRAY");
      console.log(ingredientsArray);
  };




  //JS code to allow you to add multiple ingredients
  var next = 0;
    $("#add-more").click(function(e){
        e.preventDefault();

        addToIngredients();


        var addto = "#field" + next;
        // var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field'+ next +'" name="field'+ next +'"><label for="ingredients">Ingredient:</label><div id="ingredients'+ next +'"></div><label for="amount">Ingredient amount:</label><input type="text" class="form-control" id="amount'+ next +'" aria-describedby="amount" placeholder="The amount for this ingredient">';
        var newInput = $(newIn);
        // var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Remove</button></div></div><div id="field">';
        // var removeButton = $(removeBtn);
        $(addto).after(newInput);
        // $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
        
            // $('.remove-me').click(function(e){
            //     e.preventDefault();
            //     var fieldNum = this.id.charAt(this.id.length-1);
            //     var fieldID = "#field" + fieldNum;
            //     $(this).remove();
            //     $(fieldID).remove();
            // });
        
        //========= another AJAX call to create the next ingredients dropdown in the "new recipe" form ========//
        $.ajax({
          type: "GET",
          url: "/api/ingredients"
        }).then(function (ingredients) {
          // console.log("Making AJAX call");
          var options = ingredients.map(function (ingredient) {
            // return `<option id="ingredient-select" value="${ingredient.name}">${ingredient.id}</option>`;
            return `<option id="ingredient-select" value="${ingredient.id}">${ingredient.name}</option>`;
          });
          $("#ingredients"+ next).append('<input class="form-control" aria-describedby="ingredients" list="options" id="ingredients-dropdown'+ next +'"></input>');
          $("#ingredients-dropdown"+ next).after(`<datalist id="options">${options}</datalist>`);

          //Update $ingredient and $amount variables so they are ready to push to the ingredientsArray
          $ingredient = $("#ingredients-dropdown"+ next);
          $amount = $("#amount"+ next);

        });

    });




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
  };

  // handleFormSubmit is called whenever we submit a new recipe ==========================//
  // Save the new recipe to the db and refresh the list
  var handleFormSubmit = function (event) {
    event.preventDefault();

    //push the last ingredient and amount added to the ingredientsArray
    addToIngredients();
  

    //FIXME: Ingredient IDs for new recipes are store as strings, not integers, so the backend code that JSON parses the recipe info to display on the recipe/example page needs to parseInt the ID?

    //stringify the ingredient array
    var ingredientString = JSON.stringify(ingredientsArray);

    var recipe = {
      recipe_name: $name.val().trim(),
      ingredients: ingredientString,
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
    $ingredient.val("");
    $amount.val("");
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

});
