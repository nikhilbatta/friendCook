import $ from 'jquery';

export class MasterList {
  constructor(){
    this.shared = new IngredientList();
    this.suggested = new IngredientList();
    this.search = new IngredientList();
    this.shopping = new IngredientList();
    this.activeIngredient = "";
  }
  compareShoppingShared() {
    for(let i = 0; i<this.shopping.ingredients.length; i++){
      let ingredient = masterList.shopping.ingredients[i].name
      for(let j=0; j<masterList.shared.ingredients.length; j++)
      if(ingredient === masterList.shared.ingredients[j].name){
        masterList.shopping.ingredients[i].flagged=true;
        console.log(ingredient)
      }
    }
  }

  displayShoppingList(){
    let newHTML = "";
    this.shopping.ingredients.forEach(function(ingredient){
      let duplicate = ""
      if(ingredient.flagged === true){
        duplicate = "duplicate";
      }
      let name = ingredient.name;
      let amount = ingredient.amount.toFixed(2);
      let unit = ingredient.unit;
      let claimedBy = ingredient.claimedBy;
      let crossedOut = "";
      if (claimedBy !== ""){
        crossedOut = "crossedOut";
      }
      newHTML += `<li class="ingredient" id="${name}"><span class="${duplicate} ${crossedOut}">${amount} ${unit} ${name}</span>   ${claimedBy}</li>`
      console.log(newHTML)
    })
    $("#shopping-list").html(newHTML)
  }

  pushToSearch(name){
    this.shared.ingredients.forEach((ingredient) => {
      if (ingredient){
        if(name === ingredient.name){
          this.search.ingredients.push(ingredient)
        }
      }
    })
  }
}

export class IngredientList {
  constructor(){
    this.ingredients = [];
  }
  addIngredient(ingredient){
    this.ingredients.push(ingredient);
  }
  removeIngredient(ingredient){
    for (let i=0;i<this.ingredients.length;i++){
      if (this.ingredients[i]) {
        if(ingredient === this.ingredients[i].name){
          this.ingredients[i] = undefined;
        }
      }
    }
  }
  changeName(ingredient, newName){
    for (let i=0;i<this.ingredients.length;i++){
      if (ingredient === this.ingredients[i].name){
        this.ingredients[i].name = newName;
        return;
      }
    }
  }
  changeAmount(ingredient, amount){
    for (let i=0;i<this.ingredients.length;i++){
      if (ingredient === this.ingredients[i].name){
        this.ingredients[i].amount = amount;
        return;
      }
    }
  }
  setClaimedByOnList(ingredient, personName) {
    for (let i=0;i<this.ingredients.length;i++){
      if (ingredient === this.ingredients[i].name){
        this.setClaimedBy(personName);
        return;
      }
    }
  }
}

export class Ingredient {
  constructor(name, amount, unit){
    this.name = name;
    this.claimedBy = "";
    this.amount = amount;
    this.unit = unit;
    this.flagged = false;
    this.recipe = "";
  }
  setClaimedBy(personName){
    this.claimedBy = personName;
  }
}

export let masterList = new MasterList();
