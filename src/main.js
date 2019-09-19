
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList, masterList} from './ingredientList.js';
import {RecipeByIngredients} from './apiCall.js'
import {Recipes, RecipeTemplate, recipeHolder } from './recipes.js';


$(document).ready(function(){
  attachRecipeListeners();
  attachedSharedListners();


  $(".scrollTo").on('click', function(e) {
     e.preventDefault();
     var target = $(this).attr('href');
     $('html, body').animate({
       scrollTop: ($(target).offset().top)
     }, 1000);
  });

  $("#resource-input-button").click(function(){
    let name = $("#name-input").val();
    let amount =$("#amount-input").val();
    let unit =$("#unit-input").val();
    let newIngredient = new Ingredient(name, amount, unit);
    masterList.shared.addIngredient(newIngredient);
    displayShared();
  })
  $("#userSearchButton").click(function(){
    let search = $("#userInputSearch").val();
    let newIngredient = new Ingredient(search);
    masterList.search.addIngredient(newIngredient);
    displaySearch()
  })

  $("#serving-input-button").click(function(){
    recipeHolder.servings = $("#serving-input").val();
  })

  $("#submit-recipes").click(function(){
    recipeHolder.scaleRecipes()
    masterList.shopping = recipeHolder.buildShoppingList();
    masterList.compareShoppingShared()
    masterList.displayShoppingList()
  })
  $("#fullSearch").click(function(){
  masterList.search.ingredients.filter(ingredient => ingredient != undefined);
  let result = masterList.search.ingredients.map(function(ingredient){
    return ingredient.name
  })
  callRecipeAPI(result)
  })

  $("#edit-shopping-ingredient").click(function(){
    activeIngredientEditor();
    $("#shopping-list").text("");
    masterList.displayShoppingList();
    $(".shopping-editor").hide();
  })
})

function attachedSharedListners() {
  $('div#display-resource').on("click", "button", function() {
    let name = this.id;
    if(name[0] === "!"){
      masterList.pushToSearch(name.slice(1));
      displaySearch()
    } else {
      masterList.shared.removeIngredient(name);
      displayShared();
    }
  })
}

function attachRecipeListeners() {
  $("#recipe-Viewer").on("click", "button", function() {
    let id = this.id;
    recipeHolder.makeActive(id);
    let string = "";
    recipeHolder.recipes.forEach(function(recipe){
      if (recipe.active === true){
      string += `<p id=${id}> ${recipe.title}</p>`
      }
    })
    $("#active-Recipes").html(string);
  });
  // $("#active-Recipes").on("click", "p", function(){
  //   let id = this.id;
  //   recipeHolder.makeInactive(id);
  //   let string = "";
  //   recipeHolder.recipes.forEach(function(recipe){
  //     if (recipe.active === true){
  //     string += `<p id=${id}> ${recipe.title}</p>`
  //     }
  //   })
  //   $("#active-Recipes").html(string);
  // });

  $("#shopping-list").on('click', 'li', function(){
    let id = this.id;
    $(".ingredient").removeClass("active")
    if (id === masterList.activeIngredient){
      masterList.activeIngredient = "";
      $(".shopping-editor").hide();
    } else {
      $(`#${id}`).addClass("active")
      masterList.activeIngredient = id;
      $("#shopping-ingredient-name").val("")
      activeIngredientPopulator();
      $(".shopping-editor").show();
    }
  })
}

function activeIngredientEditor(){
  let id = masterList.activeIngredient;
  for (let i=0; i<masterList.shopping.ingredients.length; i++){
    if (masterList.shopping.ingredients[i].name == id){
    let ingredient = masterList.shopping.ingredients[i];
    ingredient.name = $("#shopping-ingredient-name").val()
    ingredient.amount = $("#shopping-ingredient-amount").val();
    ingredient.unit = $("#shopping-ingredient-unit").val();
    ingredient.claimedBy = $("#shopping-ingredient-claimed-by").val();
    }
  }
}

function activeIngredientPopulator(){
    let id = masterList.activeIngredient;
    console.log(id);
    for (let i=0; i<masterList.shopping.ingredients.length; i++){
      if (masterList.shopping.ingredients[i].name == id){
      let ingredient = masterList.shopping.ingredients[i];
      $("#shopping-ingredient-name").val(ingredient.name);
      $("#shopping-ingredient-amount").val(ingredient.amount);
      $("#shopping-ingredient-unit").val(ingredient.unit);
      $("#shopping-ingredient-claimed-by").val(ingredient.claimedby);
      }
    }
}

function displayShared(){
  let newHTML= "<ul>"
  masterList.shared.ingredients.forEach(function(ingredient){
    if(ingredient){
      newHTML += `<li>${ingredient.name} ${ingredient.amount} ${ingredient.unit} <button id=${ingredient.name}>delete</button> <button id="!${ingredient.name}">Add to Search</button></li>`
    }
  })
  newHTML += "</ul>"
  $('div#display-resource').html(newHTML);
}

function displaySearch(){
  let newHTML= "<ul>";
  console.log("masterList =", masterList)
  masterList.search.ingredients.forEach(function(ingredient){
    console.log(ingredient.name)
      newHTML += `<li>${ingredient.name}</li>`;
  })
  newHTML += "</ul>"
  $('div#display-search').html(newHTML);
}

function callRecipeAPI(ingredients){
  console.log(ingredients)
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients).then(makeRecipeObj,error);
}

function makeRecipeObj(response){
  let recipe = JSON.parse(response);
  recipeHolder.recipeExtractor(recipe.results);
  recipeHolder.displayResults();
}

function error(error){
  console.log(error.statusText);
}
