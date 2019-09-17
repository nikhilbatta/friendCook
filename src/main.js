
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';
import {} from './project';
import {RecipeByIngredients} from './mainingredient.js'

$(document).ready(function(){
  var arr = ["chicken"]
  callRecipeAPI(arr)
})

function callRecipeAPI(ingredients){
  console.log("itsworking")
 let recipeCall = new RecipeByIngredients();
 recipeCall.getIdByIngredient(ingredients).then(displayRecipe)// display function, if error then we call a error function)
}

function displayRecipe(response){
 let recipe = JSON.parse(response)
 console.log(recipe.results[0].missedIngredients[0].originalString)
 recipe.results.forEach(function(result){
   let ingredientsString = ""
   result.missedIngredients.forEach(function(ingredient){
     ingredientsString += `<li>${ingredient.originalString}</li>`
     })


   $(".results").append(`

     <div class="recipeItem"><h1 id="title">${result.title}</h1>
     <p id="sourceURL"><a href="${result.sourceUrl}">Check Out This Recipe</p></a>
     <p id="readyInMinutes">${result.readyInMinutes}<p>
     <p id ="servings">${result.servings}</p>
     <img class="recipePictures" src="${result.image}" alt="">
     <button id=${result.id}>Make this recipe!</button>
     </div>
     ${ingredientsString}
     `)
 })
}
