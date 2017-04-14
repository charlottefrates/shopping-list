// Application state = object
var state = {
     items: [ ],
};

function addToShoppingList (state, item){
     state.items.push({
          name: item,
          checked: false,
          deleted : false
     });
}

function updateStatus(state, element) {
    //find the index of element to be checked true/false taking the index value from li atrribute index
	var itemIndex = element.closest('li').attr('index');
    state.items[itemIndex].checked = !state.items[itemIndex].checked;
}


function deleteItem(state, element) {
	//find item name
	var itemIndex = element.closest('li').attr('index');
	// remove item from state.items
	//state.items.splice(itemIndex, 1);
    state.items[itemIndex].deleted = true;
}


function crossOutItem(element) {
	element.closest('li').children('.shopping-item').toggleClass('shopping-item__checked');
}

//DOM Manipulation
function renderList (state, element, item, action, itemIndex) {
	if (action === 'add') {
		//Place the index value with li as attribute so that we can check and delete the respective item
		var itemsHTML = '<li index="'+itemIndex + '"><span class="shopping-item">'
          + state.items[itemIndex].name
          + '</span><div class="shopping-item-controls">'
          + '<button class="shopping-item-toggle">'
          + '<span class="button-label">check</span>'
          + '</button><button class="shopping-item-delete">'
          + '<span class="button-label">delete</span></button></div></li>';
		element.append(itemsHTML);
	} else if (action === 'remove') {
		element.closest('li').remove();
	}
}



$('document').ready(function () {
    var counter = 0;
    //form submission
	$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    //Fetch Item Name from the entry text box
    var itemName = $('#shopping-list-entry').val();
    addToShoppingList(state, itemName);
    // Since it's an array, the new item will get inserted in the array in the last, so we can pick the index from length
    var itemIndex = counter++;
    renderList(state, $('.shopping-list'), itemName, 'add', itemIndex);
	});

     //check item toggle
	$('.shopping-list').on('click', '.shopping-item-toggle' ,function() {
		updateStatus(state, $(this));
		crossOutItem($(this));
	});

     //delete items
	$('.shopping-list').on('click', '.shopping-item-delete', function() {
		deleteItem(state, $(this));
		renderList(state, $(this), null, 'remove');
	});
});

/*
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

//state.items[].name WRONG
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
     // var index = element.closest('li').attr('index')
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
		deleteItem(state, $(this));
		renderList(state, $(this), null, 'remove');
	});
});
*/
