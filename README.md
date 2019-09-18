# _Friend Cook_

#### _This program helps groups plan meals and use foods they already have_

#### By _**Ethan Samuels-Ellingson, Nikhil Batta, Joel Stockamp, Carrie Schmid**_

## Description

This website allows users to search for recipes and plan portions for groups. Users can list foods they have and that can be used by the group.

## Specifications

PHASE 1:
Scenario: user adds an ingredient to share with group  
When a user enters an ingredient and clicks "share"  
Given the input is valid  
Then the ingredient is added to the array and immediately displayed  

Scenario: A user wants modify an ingredient in the shared food list  
When a user clicks on an ingredient  
Given the ingredient is in the shared food list  
Then the user can mark that the ingredient as claimed or remove  

Scenario: A user can remove an ingredient from the shared food list
When a user clicks an ingredient
Given there is an ingredient to click on
Then the ingredient is removed

Scenario: user add ingredients to search for recipes including from shared
When a user clicks ingredients in shared ingredients or recommendations
Given there are things for the user to click on  
Then add clicked ingredient to search

Scenario: user add ingredients to search for recipes including from input field
When a user clicks add to searches
Given they have typed an ingredient into the input field
Then add ingredient to search

Scenario: make a search
When a user clicks search
Given there are ingredients in the search array
Then make a search and show results

Stretch:
Scenario: user can remove an item from search
When a user clicks an item in the search list
Given there is an item in the search list
Then the item is removed

search by ID

Phase 2:
Scenario: User selects a recipe  
When a user selects a recipe to cook from the displayed list  
Given The recipe exists in our DB or in API  
Then recipe saved as our 'active' recipe. ingredients are added to shopping list.  



Phase 3:
Scenario: Shopping list is compared to shared resources  
When a user has selected a recipe  
Given the recipe is added and there is a shared resource list  
Then each ingredient that is found in the shared resource list is flagged for the user to edit, or remove.  

Scenario: user can claim item from list for recipes  
When an item is needed for a recipe   
Given the item is in the shared foods array (as determined by user) and the shopping list exists  
Then the user can edit the item  

STRETCH:
Scenario: A user wants modify an ingredient in the shopping list  
When a user clicks on an ingredient  
Given the ingredient is in the shopping list  
Then the user can mark that the ingredient will be brought by which person  

STRETCH:
Scenario: A user wants to combine items in the shopping list  
When the list loads
Given the ingredient is duplicated in the shopping list  
Then the items are combined into one (or at least alphabetized so it's easy to see)  







## Setup/Installation Requirements

TBD

## Known Bugs

TBD

## Support and contact details

_contact Ethan Samuels-Ellingson at ethansamuelsellingson@gmail.com _

TBD

## Technologies Used

TBD

_JavaScript with some ES6 features_

### License

MIT License

Copyright (c) 2019 **_Ethan Samuels-Ellingson, Nikhil Batta, Joel Stockamp, Carrie Schmid_**
