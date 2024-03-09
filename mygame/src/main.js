import kaboom from "kaboom"

const k = kaboom( 
	{
	width: 520,
    height: 520,
	})

k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("gardenbox", "sprites/carrotgrownbox.png")

const bean = k.add([
	k.pos(120, 80),
	k.sprite("bean"),
	k.area(),
	k.body(),
])

const gardenbox = k.add([
	k.pos(320, 80),
	k.sprite("gardenbox"),
	k.scale(.5),
	k.area(),
	k.body({ isStatic: true}),
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


/******** COLLISION  ********/

k.onCollide("gardenbox", () => {
	console.log('Collision detected! Bean value, Gardenbox value');
	
    k.addKaboom()
})