import kaboom from "kaboom"

const k = kaboom( 
	{
	width: 520,
    height: 520,
	})

k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("gardenbox", "sprites/carrotgrownbox.png")

const player = k.add([
	k.pos(120, 80),
	k.sprite("bean"),
	k.area(),
])

const gardenbox = k.add([
	k.pos(320, 80),
	k.sprite("gardenbox"),
	k.scale(.5),
	k.area(),
])

k.onMouseMove(() => {
	const { x, y } = mousePos();
	const angle = Math.atan2(y - player.pos.y, x - player.pos.x);
	const distance = Math.sqrt((x - player.pos.x)^2 + (y - player.pos.y)^2)
	player.move(vec2(400 * Math.cos(angle),400 * Math.sin(angle)));

})

k.onCollide("bean", "gardenbox", () => {
	console.log('Collision detected! Bean value, Gardenbox value');
	
    k.addKaboom()
})