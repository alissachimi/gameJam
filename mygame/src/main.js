import kaboom from "kaboom"

kaboom({
	width: 520,
    height: 520,
})

loadSprite("background", "sprites/gardenbackground.png");

// Create a background entity
const background = add([
  sprite("background"), // Use the loaded background image
  pos(0, 0),
  scale(.52), // Adjust the scale if needed
]);

loadSprite("bean", "sprites/bean.png")
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


const bean = add([
	sprite("bean"),
	pos(225, 225),
	area(),
	body(),
])

var gardenBoxContents=["empty", "empty", "empty", "empty"]

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

var collidedBox = ""
bean.onCollide("gardenbox1", (gardenbox1) => {
	collidedBox = "gardenbox1"
	openSeedSelector();
	
})
bean.onCollide("gardenbox2", (gardenbox2) => {
	collidedBox = "gardenbox2"
	openSeedSelector();
	
})
bean.onCollide("gardenbox3", (gardenbox3) => {
	collidedBox = "gardenbox3"
	openSeedSelector();
	
})
bean.onCollide("gardenbox4", (gardenbox4) => {
	collidedBox = "gardenbox4"
	openSeedSelector();
	
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

document.getElementById("cornButton").addEventListener("click", function() {plantSeed('corn'); document.getElementById("myModal").style.display = "none";}, false);
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
	}

	modal.style.display = "none";
	

}

var gardenBoxes=[gardenbox1, gardenbox2, gardenbox3, gardenbox4]
var gardenBoxNames=["gardenbox1", "gardenbox2", "gardenbox3", "gardenbox4"]
var gardenBoxPositions = [[10, 50], [320, 50], [320, 340], [10, 340]]

document.getElementById("growSeedsB").addEventListener("click", growSeed, false);
function growSeed(){
	for(var i=0; i<4; i++){
		console.log(gardenBoxContents)
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
			} else {
				gardenBoxes[i] = add([
					pos(gardenBoxPositions[i]),
					sprite(gardenBoxPositions[i] + "deadbox"),
					scale(.25),
					area(),
					body({ isStatic: true}),
					gardenBoxNames[i]
				])
			}
		}
	}
}

function probabilityOfSurvival(fruitType){
	return 1;
}