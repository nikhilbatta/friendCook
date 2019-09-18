
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

  // let recipeHolder = new Recipes();
  // let masterList = new MasterList();


  $("#resource-input-button").click(function(){
    let name = $("#name-input").val();
    let amount =$("#amount-input").val();
    let unit =$("#unit-input").val();
    let newIngredient = new Ingredient(name, amount, unit);
    masterList.shared.addIngredient(newIngredient);

    displayShared(masterList);
  })
  $("#userSearchButton").click(function(){
    let search = $("#userInputSearch").val();
    console.log(search)
    let newIngredient = new Ingredient(search);
    console.log(newIngredient);
    masterList.search.addIngredient(newIngredient);
    displaySearch()
  })

  $("#serving-input-button").click(function(){
    recipeHolder.servings = $("#serving-input").val();
  })

  $("#submit-recipes").click(function(){
    recipeHolder.scaleRecipes()
    masterList.shopping = recipeHolder.buildShoppingList();
    console.log(masterList)
  })
  $("#fullSearch").click(function(){
  masterList.search.ingredients.filter(ingredient => ingredient != undefined);
  let result = masterList.search.ingredients.map(function(ingredient){
    return ingredient.name
  })
  callRecipeAPI(result)
  })



})

function attachedSharedListners() {
  $('div#display-resource').on("click", "button", function() {
    console.log('check');
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
      string += ` ${recipe.title}`
      }
    })
    $("#active-Recipes").text(string);
  });
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
  recipeHolder.response = recipe.results;
  recipeHolder.recipeExtractor();
  recipeHolder.displayResults();
}

function error(error){
  console.log(error.statusText);
}
