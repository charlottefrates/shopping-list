// Application state = object
var state = {
     items: [ ],
};

function addToShoppingList (state, item){
     state.items.push({
          name: item,
          checked: false
     });
}

//state.items[].Name
function findItemIndex(state, item) {
     // Access the object state
     var objArr = state.items
	for(var i = 0; i < objArr.length; i++) {
		if (objArr[i].name === item){
			return i;
		}
	}
}

function updateStatus(state, element) {
	// fint the item name from selected element $('.shopping-list')
	var itemName = element.closest('li').children('.shopping-item').text();
	//find item in state.items
	var itemIndex = findItemIndex(state, itemName);
	state.items[itemIndex].checked = !state.items[itemIndex].checked;
}


function deleteItem(state, element) {
	//find item name
	var itemName = element.closest('li').children('.shopping-item').text();
	//find item in state.items
	var itemIndex = findItemIndex(state, itemName);
	// remove item from state.items
	state.items.splice(itemIndex, 1);
}


function crossOutItem(element) {
	element.closest('li').children('.shopping-item').toggleClass('shopping-item__checked');
}

//DOM Manipulation
function renderList (state, element, item, action) {
	if (action === 'add') {
		var itemIndex = findItemIndex(state, item);
		var itemsHTML =
          '<li><span class="shopping-item">'
          + state.items[itemIndex].name
          + '</span><div class="shopping-item-controls">'
          + '<button class="shopping-item-toggle">'
          +'<span class="button-label">check</span>'
          +'</button><button class="shopping-item-delete">'
          +'<span class="button-label">delete</span></button></div></li>';
		element.append(itemsHTML);
	} else if (action === 'remove') {
		element.closest('li').remove();
	}
}



$('document').ready(function () {

     //form submission
	$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    var itemName = $('#shopping-list-entry').val();
    addToShoppingList(state, itemName);
    renderList(state, $('.shopping-list'), itemName, 'add');
	});

     //check item toggle
	$('.shopping-list').on('click', '.shopping-item-toggle' ,function() {
		updateStatus(state, $(this));
		crossOutItem($(this));
	});

     //delete items
	$('.shopping-list').on('click', '.shopping-item-delete', function() {
		crossOutItem(state, $(this));
		renderList(state, $(this), null, 'remove');
	});
});
