import $ from 'jquery'
import {Ingredient, IngredientList, MasterList} from './ingredientList.js';


export class RecipeTemplate {
  constructor(id,title,url,readyTime,servings,image,recipeIngredients){
    this.active = false;
    this.id = id;
    this.title = title;
    this.url = url;
    this.readyTime = readyTime;
    this.servings = servings;
    this.image = image;
    this.recipeIngredients = recipeIngredients
  }
}

export class Recipes {
  constructor(response){
    this.servings = 1;
    this.response = "";
    this.recipes = [];
  }
  makeActive(id){
    for (let i=0;i<this.recipes.length;i++){
      if (this.recipes[i].id == id) {
        this.recipes[i].active = true;
        return;
      }
    }
  }
  recipeExtractor(){
    let group = [];
    this.response.forEach(function(recipeRaw){
      let id = recipeRaw.id;
      let title =recipeRaw.title;
      let url = recipeRaw.sourceUrl;
      let readyTime = recipeRaw.readyInMinutes;
      let servings = recipeRaw.servings;
      let image = recipeRaw.image;
      let recipeIngredients = [];
      recipeRaw.missedIngredients.forEach(function(missedIngredient){
        let name = missedIngredient.name;
        let amount = missedIngredient.amount;
        let unit = missedIngredient.unit;
        let ingredient = new Ingredient(name,amount,unit);
        recipeIngredients.push(ingredient);
      });
      let recipe = new RecipeTemplate(id,title,url,readyTime,servings,image,recipeIngredients);
      group.push(recipe);
    })
    this.recipes = group;
  }
  displayResults(){
    this.recipes.forEach(function(result){
      let ingredientsString = "";
      result.recipeIngredients.forEach(function(ingredient){
        ingredientsString += `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</li>`
      });
      $("#recipe-Viewer").append(`
        <div class="recipeItem row">
        <h3 id="title">${result.title}</h3>
        <p id="sourceURL"><a href="${result.url}">Check Out This Recipe</p></a>
        <img class="recipePictures" src="${result.image}" alt="">
        <p id="readyInMinutes">${result.readyTime} minutes</p>
        <p id ="servings">${result.servings} servings</p>
        <button id=${result.id}>Make this recipe!</button>
        <div id ="recipe-ingredients">${ingredientsString}</div>
        </div>
      `);
    })
  }
  scaleRecipes(){
    let servings = this.servings
    this.recipes.forEach(function(recipe){
      let scaleServing = Math.ceil(servings / recipe.servings)
      recipe.recipeIngredients.forEach(function(ingredient){
        ingredient.amount *= scaleServing;
      })
    })
  }
  buildShoppingList(){
    let shoppingList = new IngredientList();
    this.recipes.forEach(function(recipe){
      if (recipe.active === true){
        recipe.recipeIngredients.forEach(function(ingredient){
          shoppingList.ingredients.push(ingredient);
        })
      }
    })
    return shoppingList;
  }
}

export let recipeHolder = new Recipes();
