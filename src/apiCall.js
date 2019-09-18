export class RecipeByIngredients{
  getIdByIngredient(ingredients){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients[0]}`;
      for (var i =1; i<ingredients.length;i++){
        url+= `,+${ingredients[i]}`;
      }
      url += `&addRecipeInformation=true&fillIngredients=true&apiKey=38ef4cc54da64613bb8a43bd28882131`;
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
