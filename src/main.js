
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList, masterList} from './ingredientList.js';
import {RecipeByIngredients} from './apiCall.js'
import {Recipes, RecipeTemplate, recipeHolder } from './recipes.js';


$(document).ready(function(){
  attachListeners();
  // let recipeHolder = new Recipes();
  // let masterList = new MasterList();


  $("#resource-input-button").click(function(){
    console.log("inform")
    let name = $("#name-input").val();
    let amount =$("#amount-input").val();
    let unit =$("#unit-input").val();
    let newIngredient = new Ingredient(name, amount, unit);
    masterList.shared.addIngredient(newIngredient);
    displayResources(masterList);
  })

  $("#serving-input-button").click(function(){
    recipeHolder.servings = $("#serving-input").val();
  })

  $("#submit-recipes").click(function(){
    recipeHolder.scaleRecipes()
    masterList.shopping = recipeHolder.buildShoppingList();
    console.log(masterList)
  })

  masterlist.displayShoppingList();
  // var arr = ["basil", "tomatoes"]
  // callRecipeAPI(arr);
})

function attachListeners() {
  $("#recipe-Viewer").on("click", "button", function() {
    let id = this.id;
    recipeHolder.makeActive(id);
    let string = "";
    recipeHolder.recipes.forEach(function(recipe){
      if (recipe.active === true){
      string += ` ${recipe.title}`
      }
    })
    $("#active-Recipes").text(string);
  });
}

function displayResources(masterList){
  let newHTML= "<ul>"
  masterList.shared.ingredients.forEach(function(ingredient){
    newHTML += `<li>${ingredient.name} ${ingredient.amount} ${ingredient.unit}</li>`
  })
  newHTML += "</ul>"
  $('div#display-resource').html(newHTML);
}

function callRecipeAPI(ingredients){
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients).then(makeRecipeObj,error)
}

function makeRecipeObj(response){
  let recipe = JSON.parse(response);
  recipeHolder.response = recipe.results
  recipeHolder.recipeExtractor()
  recipeHolder.displayResults()
}

function error(error){
  console.log(error.statusText);
}
