export class ActiveRecipes {
  constructor(recipeArray){
    this.activeRecipes = recipeArray;
    this.scaleArray(servings)
  }
  scaleArray(servings){
    this.activeRecipes.forEach(recipe){
      let scaleServing = Math.ceil(servings / recipe.servings)
      recipe.missedIngredient.forEach(ingredient){
        ingredient.amount *= scaleServing;
      }
    }
  }
}
