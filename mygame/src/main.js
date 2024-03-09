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


const bean = add([
	sprite("bean"),
	pos(225, 225),
	area(),
	body(),
])



const gardenbox1 = add([
	pos(10, 50),
	sprite("gardenbox"),
	scale(.25),
	area(),
	body({ isStatic: true}),
	"gardenbox1"
])
const gardenbox2 = add([
	pos(320, 50),
	sprite("gardenbox"),
	scale(.25),
	area(),
	body({ isStatic: true}),
	"gardenbox2"
])
const gardenbox3 = add([
	pos(320, 340),
	sprite("gardenbox"),
	scale(.25),
	area(),
	body({ isStatic: true}),
	"gardenbox3"
])
const gardenbox4 = add([
	pos(10, 340),
	sprite("gardenbox"),
	scale(.25),
	area(),
	body({ isStatic: true}),
	"gardenbox4"
])

const SPEED = 300;

/*k.onMouseMove(() => {
	const { x, y } = mousePos();
	const angle = Math.atan2(y - bean.pos.y, x - bean.pos.x);
	const distance = Math.sqrt((x - bean.pos.x)^2 + (y - bean.pos.y)^2)
	bean.move(vec2(400 * Math.cos(angle),400 * Math.sin(angle)));

})*/

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

bean.onCollide("gardenbox1", (gardenbox1) => {
		openSeedSelector();
		destroy(gardenbox1);
		gardenbox1 = add([
			pos(10, 50),
			sprite("carrotplantedbox"),
			scale(.25),
			area(),
			body({ isStatic: true}),
			"carrotplantedbox"
		])
	
	
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

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
	}
}