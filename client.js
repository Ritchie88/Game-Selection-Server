let game_options = 
	["Secret Hitler", "Avalon", "Wolves", 
	"President", "Wizard", "Five Crowns", 
	"Euchure", "Catan", "GOT Risk", 
	"Exploding Kittens", "Unstable Unicorns", 
	"Castle River Game", "Crabs", "Jenga", 
	"Poker", "Jackbox", "Ultimate Chicken Horse", 
	"Mario Cart", "Watch Something"];
	
	
let selections = [];
let optionsSelected = 0;
let listDiv = document.getElementById("selections");
let firstChoice = document.getElementById("first");
let secondChoice = document.getElementById("second");
let thirdChoice = document.getElementById("third");
let forthChoice = document.getElementById("fourth");
let lastChoice = document.getElementById("last");


function init(){
	let count = 0;
	//add the game options as a list of checkboxes
	for(option in game_options){
		list = document.createElement("input")
		list.setAttribute("type", "checkbox");
		list.id =  option;
		list.setAttribute("onclick","selectionCount(this)");
		label = document.createElement("label");
		label.innerHTML = game_options[option];
		//add the options to the list div in the HTML
		listDiv.appendChild(list);
		listDiv.appendChild(label);
		listDiv.appendChild(document.createElement("br"));
	}
}

function selectionCount(clicked){
	//Check if the user selected or de-selected the box, and change the counter accordingly
	if(clicked.checked === true){
		optionsSelected++;
		selections.push(clicked.id);

		 if(firstChoice.value === undefined || firstChoice.value < 0){
			 firstChoice.value = clicked.id;
			 firstChoice.innerHTML = "1. " + game_options[clicked.id];
		 }else{
			 if(secondChoice.value === undefined || secondChoice.value < 0){
				secondChoice.value = clicked.id;
				secondChoice.innerHTML = "2. " +  game_options[clicked.id];
			}else{
				if(thirdChoice.value == undefined || thirdChoice.value < 0){
					 thirdChoice.value = clicked.id;
					 thirdChoice.innerHTML = "3. " + game_options[clicked.id];
				}else{
					if(forthChoice.value == undefined || forthChoice.value < 0){
						 forthChoice.value = clicked.id;
						 forthChoice.innerHTML = "4. " + game_options[clicked.id];
					 }else{
						lastChoice.value = clicked.id;
						lastChoice.innerHTML = "5. " + game_options[clicked.id];
					}
				}
			}
		 }
		 
	}else{
		optionsSelected--;
		selections.splice(selections.indexOf(clicked.id), 1);
		
		if(firstChoice.value == clicked.id){
			 firstChoice.value = -1;
			 firstChoice.innerHTML = "1. ";
		 }else{
			 if(secondChoice.value == clicked.id){
				secondChoice.value = -1;
				secondChoice.innerHTML = "2. ";
			}else{
				if(thirdChoice.value == clicked.id){
					 thirdChoice.value = -1;
					 thirdChoice.innerHTML = "3. ";
				}else{
					if(forthChoice.value == clicked.id){
						 forthChoice.value = -1;
						 forthChoice.innerHTML = "4. ";
					 }else{
						if(lastChoice.value == clicked.id){
						 lastChoice.value = -1;
						 lastChoice.innerHTML = "5. ";
						}
					}
				}
			}
		 }
	}
	
	//when the selected options reaches 5, then disable the ability to select more
	if(optionsSelected >= 5){
		for(child in listDiv.children){
			if(listDiv.children[child].type == "checkbox"){
				if(listDiv.children[child].checked === false){
					listDiv.children[child].disabled = true;
				}
			}
		}
	//when there are less than 5 options allow boxes to be selected
	}else{
		for(child in listDiv.children){
			if(listDiv.children[child].type == "checkbox"){
				listDiv.children[child].disabled = false;
			}
		}
	}
	console.log(selections);
}

function sendToServer(){
	let req = new XMLHttpRequest();//create a POST XML request to send the order to the server
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){//if the server is ready
			console.log("Choices Sent Successfully");

		}
	}
	//open the link to the serer with POST
	req.open("POST", "http://localhost:3000/selections");
	req.send(JSON.stringify(selections));//send the order to the restaurant
}
