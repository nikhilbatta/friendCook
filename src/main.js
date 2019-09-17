
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import {Ingredient IngredientList MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'

$(document).ready(function(){
  var arr = ["chicken"]
  callRecipeAPI(arr)
})

function callRecipeAPI(ingredients){
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients).then(displayRecipe)// display function, if error then we call a error function)
}

function displayRecipe(response){
 let recipe = JSON.parse(response)
 recipe.results.forEach(function(result){
   console.log(result.title)
   console.log(result.servings)
 })
}
