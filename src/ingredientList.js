export class MasterList {
  constructor(){
    this.shared = new IngredientList();
    this.suggested = new IngredientList();
    this.search = new IngredientList();
    this.shopping = new IngredientList();
  }
  compareShoppingShared() {
    this.shopping.forEach(function(ingredient){
      if (this.shared.includes(ingredient.name))
      ingredient.flagged=true;
    })
  }
  displayShoppingList(){
    this.shopping.forEach(function(ingredient){
      let name = ingredient.name
      let amount = ingredient.amount
      let unit = ingredient.unit
      let string = `<li id="${name}">${amount} ${unit} ${name}</li>`
      $("#shopping-list").append(string)
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
      if (ingredient === this.ingredients[i].name){
        delete this.ingredients[i];
        return;
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
  }
  setClaimedBy(personName){
    this.claimedBy = personName;
  }
}

export let masterList = new MasterList();
let chicken= new Ingredient('chicken', 1, 'whole')
let rice = new Ingredient('rice', 2, 'cups')
let tomatoes = new Ingredient('tomatoes', 3, 'whole')
masterlist.shared=[chicken, rice, tomatoes]
masterlist.shopping=[chicken, tomatoes]
