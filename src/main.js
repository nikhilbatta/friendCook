
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

  let chicken= new Ingredient('chicken', 1, 'whole')
  let rice = new Ingredient('rice', 2, 'cups')
  let tomatoes = new Ingredient('tomatoes', 3, 'whole')
  masterList.shared=[chicken, rice, tomatoes];
  masterList.shopping=[chicken, tomatoes];
  console.log(masterList)


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

  $("#edit-shopping-ingredient").click(function(){
    activeIngredientEditor();
    $("#shopping-list").text("");
    masterList.displayShoppingList();
    $(".shopping-editor").hide();
  })


  masterList.compareShoppingShared();
  console.log(masterList.shopping)

  masterList.displayShoppingList();

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
  for (let i=0; i<masterList.shopping.length; i++){
    if (masterList.shopping[i].name == id){
    let ingredient = masterList.shopping[i];
    ingredient.name = $("#shopping-ingredient-name").val()
    ingredient.amount = $("#shopping-ingredient-amount").val();
    ingredient.unit = $("#shopping-ingredient-unit").val();
    ingredient.claimedBy = $("#shopping-ingredient-claimed-by").val();
    console.log(ingredient);
    }
  }
}

function activeIngredientPopulator(){
    let id = masterList.activeIngredient;
    console.log(id);
    for (let i=0; i<masterList.shopping.length; i++){
      if (masterList.shopping[i].name == id){
      let ingredient = masterList.shopping[i];
      $("#shopping-ingredient-name").val(ingredient.name);
      $("#shopping-ingredient-amount").val(ingredient.amount);
      $("#shopping-ingredient-unit").val(ingredient.unit);
      $("#shopping-ingredient-claimed-by").val(ingredient.claimedby);
      }
    }
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
