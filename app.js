// Application state = object
state = {
     items: ["apple","oranges", "bread", "milk"], // Initial array values
     addToShoppingList: function (item) {
          this.items.push(item);
     },
     createShoppingList: function () {
          this.items.forEach(function(item){
               var shoppingListElement = (`
                  <li>
                    <span class="shopping-item">${item}</span>
                    <div class="shopping-item-controls">
                    <button class="shopping-item-toggle">
                    <span class= "button-label">check</span>
                    </button>
                    <button class="shopping-item-delete">
                    <span class ="button-label">delete</span>
                    </button>
                    </div>
                  </li>`);
                  if(item !=="") $('.shopping-list').append(shoppingListElement);
             });
     },
     deleteButton: function () {
          $('.shopping-list').on("click", '.shopping-item-delete', function(){
               var listItem = $(this).closest('li');
               var indexToRemove = listItem.index();
               listItem.remove();
               shoppingListState.items.splice(indexToRemove, 1);
               });
     },
     purchased: function () {
          $('.shopping-list').on("click", '.shopping-item-toggle', function(){
               $(this).closest('li').children('.shopping-item').toggleClass('shopping-item__checked');
               });
     }
}


//Main Event Listeners
$('#js-shopping-list-form').submit(function(event) {
     event.preventDefault();
     $('.shopping-list li').remove(); // this line prevents initial array values to append to bottom
      var shoppingItem = $('input#shopping-list-entry').val();
      state.addToShoppingList(shoppingItem);
      state.createShoppingList();
    })
state.deleteButton();
state.purchased();

//.toggleClass doesnt stay into effect when more items are added

/*
Add alert to make sure form field is populated
if(state.items.trim().length === 0) {
    alert("You must enter an item in order for it to be added.");
 return;
}
*/
