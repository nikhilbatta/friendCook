
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'
import Recipes from './recipes.js';

$(document).ready(function(){
  var arr = ["chicken"]
  callRecipeAPI(arr)
})

function callRecipeAPI(ingredients){
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients)
  .then(makeRecipeObj,error)
}

function makeRecipeObj(response){
  let recipe = JSON.parse(response);
  console.log(recipe.results)
  let recipeObj = new Recipes(recipe.results);
}

function error(response){
  console.log(response.statusText);
}
