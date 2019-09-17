export class RecipeByIngredients{
  getIdByIngredient(ingredients){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients[0]}`;
      for (var i =1; i<ingredients.length;i++){
        url+= `,+${ingredients[i]}`;
      }
      url += `&addRecipeInformation=true&fillIngredients=true&apiKey=44e619f92a604568a5cea31ff14f18da`;
      console.log(url);
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response)
        }
       else{
        reject(Error(request.statusText))
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}
}
