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
  recipeExtractor(results){
    results.forEach((recipeRaw)=>{
      let id = recipeRaw.id;
      let title =recipeRaw.title;
      let url = recipeRaw.sourceUrl;
      let readyTime = recipeRaw.readyInMinutes;
      let servings = recipeRaw.servings;
      let image = recipeRaw.image;
      let recipeIngredients = [];
      recipeRaw.missedIngredients.forEach((missedIngredient) =>{
        let name = missedIngredient.name;
        let amount = missedIngredient.amount;
        let unit = missedIngredient.unit;
        let ingredient = new Ingredient(name,amount,unit);
        recipeIngredients.push(ingredient);
      });
      let recipe = new RecipeTemplate(id,title,url,readyTime,servings,image,recipeIngredients);
      console.log('this', this)
      console.log(this.recipes);
      this.recipes.push(recipe);
    })
  }

  displayResults(){
    let newHTML = "";
    this.recipes.forEach(function(recipe){
      newHTML +=
      `<div class="recipeItem">
        <h3 id="title">${recipe.title}</h3><br>
        <p id="sourceURL"><a href="${recipe.url}">Check Out This Recipe</p></a><br>
        <img class="recipePictures" src="${recipe.image}" alt=""><br>
        <p id="readyInMinutes">${recipe.readyTime} minutes</p><br>
        <p id ="servings">${recipe.servings} servings</p><br>
        <button id=${recipe.id}>Make this recipe!</button><br>
          <div class="recipe-ingredients">
            <ul>`
      recipe.recipeIngredients.forEach(function(ingredient){
        newHTML += `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</li>`
      });
      newHTML += `</ul></div></div>`;
    })
    $('#recipe-Viewer').html(newHTML);
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
