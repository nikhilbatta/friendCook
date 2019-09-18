
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'
import {Recipes} from './recipes.js';



function attachRecipeListeners() {
  console.log(recipeObj)
  $("#recipe-Viewer").on("click", "button", function() {
    let id = this.id;
    recipeObj.activeRecipes.push(id)
    console.log(recipeObj.activeRecipes)
    console.log(recipeObj)
  });
}
var recipeObj = new Recipes();
$(document).ready(function(){
  let masterlist = new MasterList();
  testData();
  $("#resource-input-button").click(function(){
    masterlist.shared.addIngredient($("#resource-input").val())
  })

  
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
  recipeObj.setRecipes(recipe.results);
  console.log("hit")
  console.log("recipeObj in make recipe =", recipeObj);
  recipeObj.displayResults()
  attachRecipeListeners();
}

function error(error){
  console.log(error.statusText);
}
