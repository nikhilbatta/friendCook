
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'
import {Recipes} from './recipes.js';



function attachRecipeListeners(recipeObj) {
  console.log(recipeObj)
  $("#recipe-Viewer").on("click", "button", function() {
    let id = this.id;
    recipeObj.activeRecipes.push(id)
    console.log(recipeObj.activeRecipes)
    console.log(recipeObj)
  });
}

$(document).ready(function(){
  let recipeObj = new Recipes();
  let masterlist = new MasterList();
  $("#resource-input-button").click(function(){
    masterlist.shared.addIngredient($("#resource-input").val())
  })

  testData();
  $("#addRecipes").click(function(){

  })
})
function testData(){
  var arr = ["chicken"]
  callRecipeAPI(arr).then(makeRecipeObj,error);
}

function callRecipeAPI(ingredients){
  console.log("recipeObj still =",recipeObj);
  let recipeCall = new RecipeByIngredients();
  let promise = recipeCall.getIdByIngredient(ingredients)
  return promise;
}

function makeRecipeObj(response){
  let recipe = JSON.parse(response);
  console.log(recipe.results)
  let recipeObj = new Recipes();
  recipeObj.setRecipes(recipe.results);
  console.log("hit")
  console.log("recipeObj in make recipe =", recipeObj);
  recipeObj.displayResults()
  attachRecipeListeners(recipeObj);
  return recipeObj;
}

function error(error){
  console.log(error.statusText);
}
