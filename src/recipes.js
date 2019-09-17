import $ from 'jquery'
export class Recipes {
  constructor(results) {
    this.recipes = results;
    this.scaleRecipes();
  }

  displayResults(){
    this.recipes.forEach(function(result){
      let ingredientsString = "";
      result.missedIngredients.forEach(function(ingredient){
        ingredientsString += `<li>${ingredient.originalString}</li>`
      });
      $(".results").append(`
        <div class="recipeItem"><h1 id="title">${result.title}</h1>
        <p id="sourceURL"><a href="${result.sourceUrl}">Check Out This Recipe</p></a>
        <p id="readyInMinutes">${result.readyInMinutes}<p>
        <p id ="servings">${result.servings}</p>
        <img class="recipePictures" src="${result.image}" alt="">
        <button id=${result.id}>Make this recipe!</button>
        </div>
        ${ingredientsString}`);
    })
  }

scaleArray(servings){
  this.recipes.forEach(recipe){
    let scaleServing = Math.ceil(servings / recipe.servings)
    recipe.missedIngredient.forEach(ingredient){
      ingredient.amount *= scaleServing;
    }
  }
}

makeActive(id){
  this.recipes.forEach(function(recipe){
    if(recipe.id === id) {
      recipe.active = true;
    }
  })
}

buildShoppingList(){
  let shoppingList = new IngredientList();
  this.recipes.forEach(function(recipe){
    recipe.missedIngredient.forEach(function(ingredient){
      let ingredient = new Ingredient(ingredient.name, ingredient.amount, ingredient.unit);
      shoppingList.ingredients.push(ingredient);
    })
  })
  return shoppingList;
}
