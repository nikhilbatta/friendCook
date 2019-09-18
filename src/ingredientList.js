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


    for(let i = 0; i<this.shopping.length; i++){
      var ingredient = masterList.shopping[i].name
      for(let j=0; j<masterList.shared.length; j++)
        if(ingredient === masterList.shared[j].name){
          masterList.shopping[i].flagged=true;
          console.log(ingredient)

        }

    }
  }


  displayShoppingList(){
    let listString = "";
    this.shopping.forEach(function(ingredient){
      let duplicate = ""
      if(ingredient.flagged === true){
        duplicate = "duplicate"
      }
      let name = ingredient.name
      let amount = ingredient.amount
      let unit = ingredient.unit
      let claimedBy = ingredient.claimedBy
      let crossedOut = ""
      if (claimedBy !== ""){
        crossedOut = "crossedOut";
      }
      let string = `<li class="ingredient" id="${name}"><span class="${duplicate} ${crossedOut}">${amount} ${unit} ${name}</span>   ${claimedBy}</li>`
      listString = listString + string
      console.log(listString)
    })
    $("#shopping-list").append(listString)
  }
  pushToSearch(name){
    console.log(name)
    this.shared.ingredients.forEach((ingredient) => {
      console.log(ingredient)
      if(name === ingredient.name){
        console.log(ingredient.name)
        this.search.ingredients.push(ingredient)
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
          console.log('match')
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
  }
  setClaimedBy(personName){
    this.claimedBy = personName;
  }
}

export let masterList = new MasterList();
