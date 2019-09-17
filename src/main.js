
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
  attachListeners();
  var arr = ["chicken"]
  callRecipeAPI(arr);
})

function callRecipeAPI(ingredients){
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients).then(makeRecipeObj,error)
}

function makeRecipeObj(response){
  let recipe = JSON.parse(response);
  console.log(recipe.results)
  let recipeObj = new Recipes(recipe.results);

  recipeObj.displayResults()
  console.log(recipeObj)
}

function error(error){
  console.log(error.statusText);
}
