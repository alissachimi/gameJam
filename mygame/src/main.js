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
loadSprite("gardenbox", "sprites/carrotgrownbox.png")

const bean = add([
	sprite("bean"),
	pos(120, 80),
	area(),
	body(),
])



const gardenbox = add([
	pos(320, 40),
	sprite("gardenbox"),
	scale(.25),
	area(),
	body({ isStatic: true}),
	"gardenbox"
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

bean.onCollide("gardenbox", (gardenbox) => {
	destroy(gardenbox);
})