console.log("main.js");

var api_url = "http://localhost:1337";

$.ajax(api_url + "/messages", {
	method: "get"
}).done(function(data,msg,xhr) {
	for (var i = 0; i < data.length; i++) {
		createMessageElement(data[i]);
	}
});


$(".create-message-form").on("submit", function(e) {
	e.preventDefault();

	$.ajax(api_url + "/messages", {
		method: "post",
		data: $(this).serialize()
	}).done(function(data) {
		console.log(data);
		createMessageElement(data);
	})

})



var createMessageElement = function(messageData) {
	var $deleteButton = $("<button class='delete'>X</button>");
	var $editButton = $("<button class='edit'>Edit</button>");
	var $inputField = $("<input>").val(messageData.content);
	var $li = $("<li data-id='"+messageData.id+"'></li>");
	
	$deleteButton.appendTo($li);
	$editButton.appendTo($li);
	$inputField.appendTo($li);
	$li.appendTo(".messages");

	$deleteButton.on("click", deleteItem);
	$editButton.on("click", setUpEdit);

	$inputField.on("keydown", preventTyping);
	$inputField.on("keyup", editItem);
}


var setUpEdit = function() {
	console.log("set up edit");

	$(this).parents("li").find("input").focus();

	$(this).parents("li").addClass("editing").siblings().removeClass("editing");
}



var preventTyping = function() {
	if ( $(this).parents("li").hasClass("editing") ) {
		// let it pass
	} else {
		event.preventDefault();
	}
}


var editItem = function() {
	console.log("edit item")

	if ( $(this).parents("li").hasClass("editing") ) {

		// ajax
		$.ajax(api_url + "/messages/" + $(this).parents().attr("data-id"), {
			method: "post",
			data: {
				content: $(this).val()
			}
		}).done(function(data) {
			console.log(data);
		})

	}
}



var deleteItem = function() {
	console.log("delete things!" )

	var $messageLi = $(this).parents("li"); // go up to the message LI
	var id = $messageLi.attr("data-id"); // the id from it's attribute

	$.ajax(api_url + "/messages/" + id, { // tell the back end to delete it
		method: "delete"
	}).done(function(data) {
		console.log(data);

		$messageLi.fadeOut(); // remove deleted item from DOM
	})
};
























