export class Recipes {
  constructor(results) {
    this.recipes = results;
  }

  //mark which ones are active with this.active = true;

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
}
    //   this.scaleArray(servings)
  // scaleArray(servings){
  //   this.activeRecipes.forEach(recipe){
  //     let scaleServing = Math.ceil(servings / recipe.servings)
  //     recipe.missedIngredient.forEach(ingredient){
  //       ingredient.amount *= scaleServing;
  //     }
  //   }
  // }
