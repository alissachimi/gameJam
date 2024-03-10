import kaboom from "kaboom"

kaboom({
	width: 520,
    height: 520,
})

//define gloabals
var gardenBoxContents=["empty", "empty", "empty", "empty"];
var gardenBoxStatus=["empty", "empty", "empty", "empty"];
var currentStep = "plant";
var playerInventory={
	'carrot':0,
	'corn':0,
	'strawberry':0,
	'pumpkin': 0,
	'tomato': 0,
	'carrotSeed':0,
	'cornSeed':0,
	'strawberrySeed':0,
	'pumpkinSeed': 0,
	'tomatoSeed': 0
};
var playerBank = 10;

var seedCosts={
	'carrot':3,
	'corn':2,
	'strawberry':5,
	'pumpkin': 5,
	'tomato': 3
}

function updatePlayerBank(amount){
	playerBank+=amount;
	document.getElementById("coinAmount").innerHTML=playerBank;
}


scene("garden", () => {
	loadSprite("background", "sprites/gardenbackground.png");

	// Create a background entity
	const background = add([
	  sprite("background"), // Use the loaded background image
	  pos(0, 0),
	  scale(.52), // Adjust the scale if needed
	]);
	
	loadSprite("bean", "sprites/bean.png")
	loadSprite("playerFront", "sprites/playerfront.png")
	loadSprite("playerBack", "sprites/playerback.png")
	loadSprite("playerLeft", "sprites/playerleft.png")
	loadSprite("playerRight", "sprites/playerright.png")

	loadSprite("gardenbox", "sprites/gardenbox.png")
	loadSprite("carrotplantedbox", "sprites/carrotplantedbox.png")
	loadSprite("cornplantedbox", "sprites/cornplantedbox.png")
	loadSprite("pumpkinplantedbox", "sprites/pumpkinplantedbox.png")
	loadSprite("strawberryplantedbox", "sprites/strawberryplantedbox.png")
	loadSprite("tomatoplantedbox", "sprites/tomatoplantedbox.png")
	
	loadSprite("carrotgrownbox", "sprites/carrotgrownbox.png")
	loadSprite("corngrownbox", "sprites/corngrownbox.png")
	loadSprite("pumpkingrownbox", "sprites/pumpkingrownbox.png")
	loadSprite("strawberrygrownbox", "sprites/strawberrygrownbox.png")
	loadSprite("tomatogrownbox", "sprites/tomatogrownbox.png")
	
	loadSprite("carrotdeadbox", "sprites/carrotdeadbox.png")
	loadSprite("corndeadbox", "sprites/corndeadbox.png")
	loadSprite("pumpkindeadbox", "sprites/pumpkindeadbox.png")
	loadSprite("strawberrydeadbox", "sprites/strawberrydeadbox.png")
	loadSprite("tomatodeadbox", "sprites/tomatodeadbox.png")
	
	
	var bean = add([
		sprite("playerFront"),
		pos(225, 225),
		area(),
		body(),
	])
	

	var gardenbox1 = add([
		pos(10, 50),
		sprite("gardenbox"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"gardenbox1"
	])
	var gardenbox2 = add([
		pos(320, 50),
		sprite("gardenbox"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"gardenbox2"
	])
	var gardenbox3 = add([
		pos(320, 340),
		sprite("gardenbox"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"gardenbox3"
	])
	var gardenbox4 = add([
		pos(10, 340),
		sprite("gardenbox"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"gardenbox4"
	])
	
	const SPEED = 300;
	
	/******** MOVEMENT  ********/
	
	onKeyDown("left", () => {
		var bean = add([
			sprite("playerLeft"),
			pos(225, 225),
			area(),
			body(),
		])
		bean.move(-SPEED, 0)
	})
	
	onKeyDown("right", () => {
		var bean = add([
			sprite("playerRight"),
			pos(225, 225),
			area(),
			body(),
		])
		bean.move(SPEED, 0)
		
	})
	
	onKeyDown("up", () => {
		var bean = add([
			sprite("playerBack"),
			pos(225, 225),
			area(),
			body(),
		])
		bean.move(0, -SPEED)
	})
	
	onKeyDown("down", () => {
		var bean = add([
			sprite("playerFront"),
			pos(225, 225),
			area(),
			body(),
		])
		bean.move(0, SPEED)	
	})
	
	
	/****** COLLISION ******/
	var collidedBox = ""
	bean.onCollide("gardenbox1", (gardenbox1) => {
		collidedBox = "gardenbox1"
		if(gardenBoxContents[0]=="empty" && currentStep=="plant"){
			openSeedSelector();
		}
		if(gardenBoxStatus[0]=="dead"){
			removeDeadProduce();
		}
		if(gardenBoxStatus[0]=="grown"){
			harvestProduce(0);
		}
		
	})
	bean.onCollide("gardenbox2", (gardenbox2) => {
		collidedBox = "gardenbox2"
		if(gardenBoxContents[1]=="empty" && currentStep=="plant"){
			openSeedSelector();
		}
		if(gardenBoxStatus[1]=="dead"){
			removeDeadProduce();
		}
		if(gardenBoxStatus[1]=="grown"){
			harvestProduce(1);
		}
		
	})
	bean.onCollide("gardenbox3", (gardenbox3) => {
		collidedBox = "gardenbox3"
		if(gardenBoxContents[2]=="empty" && currentStep=="plant"){
			openSeedSelector();
		}
		if(gardenBoxStatus[2]=="dead"){
			removeDeadProduce();
		}
		if(gardenBoxStatus[2]=="grown"){
			harvestProduce(2);
		}
		
	})
	bean.onCollide("gardenbox4", (gardenbox4) => {
		collidedBox = "gardenbox4"
		if(gardenBoxContents[3]=="empty" && currentStep=="plant"){
			openSeedSelector();
		}
		if(gardenBoxStatus[3]=="dead"){
			removeDeadProduce();
		}
		if(gardenBoxStatus[3]=="grown"){
			harvestProduce(3);
		}
		
	})
	
	//extra non kaboom stuff
	
	function openSeedSelector(){
		var modal = document.getElementById("myModal");
	
		var btn = document.getElementById("myBtn");
	
		var span = document.getElementsByClassName("close")[0];
	
		modal.style.display = "block";
	
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}
	}
	
	document.getElementById("cornButton").addEventListener("click", function() {plantSeed('corn')}, false);
	document.getElementById("pumpkinButton").addEventListener("click", function() { plantSeed('pumpkin')}, false);
	document.getElementById("strawberryButton").addEventListener("click", function() { plantSeed('strawberry')}, false);
	document.getElementById("carrotButton").addEventListener("click", function() { plantSeed('carrot')}, false);
	document.getElementById("tomatoButton").addEventListener("click", function() { plantSeed('tomato')}, false);
	
	function plantSeed(fruitType) {
		var modal = document.getElementById("myModal");
		console.log(collidedBox);
		if(collidedBox=="gardenbox1"){
			destroy(gardenbox1);
			gardenbox1 = add([
				pos(10, 50),
				sprite(fruitType + "plantedbox"),
				scale(.25),
				area(),
				body({ isStatic: true}),
				"gardenbox1"
			])
			gardenBoxContents[0]=fruitType;
			gardenBoxStatus[0] = "planted";
		}
		if(collidedBox=="gardenbox2"){
			destroy(gardenbox2);
			gardenbox2 = add([
				pos(320, 50),
				sprite(fruitType + "plantedbox"),
				scale(.25),
				area(),
				body({ isStatic: true}),
				"gardenbox2"
			])
			gardenBoxContents[1]=fruitType;
			gardenBoxStatus[1] = "planted";
		}
		if(collidedBox=="gardenbox3"){
			destroy(gardenbox3);
			gardenbox3 = add([
				pos(320, 340),
				sprite(fruitType + "plantedbox"),
				scale(.25),
				area(),
				body({ isStatic: true}),
				"gardenbox3"
			])
			gardenBoxContents[2]=fruitType;
			gardenBoxStatus[2] = "planted";
		}
		if(collidedBox=="gardenbox4"){
			destroy(gardenbox4);
			gardenbox4 = add([
				pos(10, 340),
				sprite(fruitType + "plantedbox"),
				scale(.25),
				area(),
				body({ isStatic: true}),
				"gardenbox4"
			])
			gardenBoxContents[3]=fruitType;
			gardenBoxStatus[3] = "planted";
		}
	
		modal.style.display = "none";
		
	
	}
	
	
	/******** INVENTORY *********/
	var cornAmount = 0;
	
	
	
	var gardenBoxes=[gardenbox1, gardenbox2, gardenbox3, gardenbox4]
	var gardenBoxNames=["gardenbox1", "gardenbox2", "gardenbox3", "gardenbox4"]
	var gardenBoxPositions = [[10, 50], [320, 50], [320, 340], [10, 340]]
	
	document.getElementById("growSeedsB").addEventListener("click", growSeed, false);
	function growSeed(){
		currentStep = "harvest";
		for(var i=0; i<4; i++){
			debug.log(gardenBoxContents)
			if(gardenBoxContents[i]!="empty"){
				destroy(gardenBoxes[i]);
				if(rand(0,1)<probabilityOfSurvival(gardenBoxContents[i])){
					gardenBoxes[i] = add([
						pos(gardenBoxPositions[i]),
						sprite(gardenBoxContents[i] + "grownbox"),
						scale(.25),
						area(),
						body({ isStatic: true}),
						gardenBoxNames[i]
					])
	
					gardenBoxStatus[i] = "grown";
				} else {
					gardenBoxes[i] = add([
						pos(gardenBoxPositions[i]),
						sprite(gardenBoxPositions[i] + "deadbox"),
						scale(.25),
						area(),
						body({ isStatic: true}),
						gardenBoxNames[i]
					])
					gardenBoxStatus[i] = "dead";
				}
			}
		}
	}
	
	function probabilityOfSurvival(fruitType){
		return 1;
	}
	
	
	function harvestProduce(index){
		destroy(gardenBoxes[index]);
	
		gardenBoxes[index] = add([
			pos(gardenBoxPositions[index]),
			sprite("gardenbox"),
			scale(.25),
			area(),
			body({ isStatic: true}),
			gardenBoxNames[index]
		])
	
		//increase inventory of the harvested item
		playerInventory[gardenBoxContents[index]]+=5;
	
		//display new crop amount to user
		document.getElementById(gardenBoxContents[index]+"Amount").innerText=playerInventory[gardenBoxContents[index]];
	
		// empty the garden box
		gardenBoxStatus[index] = "empty";
		gardenBoxContents[index] = "empty"
	
		
	}
}) 

scene("newspaper", () => {
	loadSprite("background", "sprites/gardenbackground.png");
	loadSprite("bean", "sprites/bean.png");	
	loadSprite("newspaperStand", "sprites/strawberrygrownbox.png")
	loadSprite("seedsStand", "sprites/corngrownbox.png")
	loadSprite("seeds", "sprites/corngrownbox.png")

	// Create a background entity
	const background = add([
		sprite("background"), // Use the loaded background image
		pos(0, 0),
		scale(.52), // Adjust the scale if needed
		]);

	const bean = add([
		sprite("bean"),
		pos(225, 225),
		area(),
		body(),
	]);

	var newspaperStand = add([
		pos(10, 50),
		sprite("newspaperStand"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"newspaperStand"
	])

	var seedsStand = add([
		pos(320, 50),
		sprite("seedsStand"),
		scale(.25),
		area(),
		body({ isStatic: true}),
		"seedsStand"
	])

	const SPEED = 300;
	
	/******** MOVEMENT  ********/
	
	onKeyDown("left", () => {
		bean.move(-SPEED, 0)
	})
	
	onKeyDown("right", () => {
		bean.move(SPEED, 0)
	})
	
	onKeyDown("up", () => {
		bean.move(0, -SPEED)
	})
	
	onKeyDown("down", () => {
		bean.move(0, SPEED)	
	})

	bean.onCollide("seedsStand", () => {
		openSeedShop();
	})

	bean.onCollide("newspaperStand", () => {
		openNewspaper();
	})

	document.getElementById("cornSeedB").addEventListener("click", function() {buySeed('corn')}, false);
	document.getElementById("pumpkinSeedB").addEventListener("click", function() { buySeed('pumpkin')}, false);
	document.getElementById("strawberrySeedB").addEventListener("click", function() { buySeed('strawberry')}, false);
	document.getElementById("carrotSeedB").addEventListener("click", function() { buySeed('carrot')}, false);
	document.getElementById("tomatoSeedB").addEventListener("click", function() { buySeed('tomato')}, false);
	
	function buySeed(fruitType){
		updatePlayerBank(-seedCosts[fruitType]);
		playerInventory[fruitType+'Seed']++
		document.getElementById(fruitType+'SeedAmount').innerHTML=playerInventory[fruitType+'Seed'];
	}

	function openSeedShop(){
		document.getElementById("buySeedsModal").style.display = "block"
		var modal = document.getElementById("buySeedsModal");
		var span = document.getElementsByClassName("close")[1];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}
	}

	function openNewspaper(){
		document.getElementById("newspaperModal").style.display = "block";
		var modal = document.getElementById("newspaperModal");
		var span = document.getElementsByClassName("close")[2];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}
	}
	
})

updatePlayerBank(0);
go("newspaper")
