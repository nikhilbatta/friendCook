
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'
import {Recipes} from './recipes.js';

function attachListeners() {
  $("#recipe-Viewer").on("click", "button", function() {
    let id = this.id
  });
}

$(document).ready(function(){
  let recipeObj = new Recipes();
  let masterList = new MasterList();
  let servings;
  attachListeners();


  $("#resource-input-button").click(function(){
    console.log("inform")
    let name = $("#name-input").val();
    let amount =$("#amount-input").val();
    let unit =$("#unit-input").val();
    let newIngredient = new Ingredient(name, amount, unit);
    console.log(newIngredient);
    masterList.shared.addIngredient(newIngredient);
    console.log(masterList.shared);
    displayResources(masterList);
  })
  $("#serving-input-button").click(function(){
    servings = $("#serving-input").val();
  })
  // var arr = ["chicken"]
  // callRecipeAPI(arr);
})

function displayResources(masterList){
  let newHTML= "<ul>"
  masterList.shared.ingredients.forEach(function(ingredient){
  console.log(masterList.shared.ingredients);
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
  console.log(recipe.results)
  let recipeObj = new Recipes(recipe.results);
  recipeObj.setRecipes(recipe.results);
  recipeObj.displayResults()
  console.log(recipeObj)
}

function error(error){
  console.log(error.statusText);
}
