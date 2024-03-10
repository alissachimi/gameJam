import kaboom from "kaboom"

kaboom({
	width: 520,
    height: 520,
})

//define gloabals
var weatherOptions = [['hot', 'sunny'], ['hot', 'cloudy'], ['hot', 'rainy'], 
						['mild', 'sunny'], ['mild', 'cloudy'], ['mild', 'rainy'], 
						['cold', 'sunny'], ['cold', 'cloudy'], ['cold', 'rainy']];

var stories = [
	{title: 'New Pizza Place!', content: 'Giuseppe is coming to Blossomville and opening a new restaurant. I am excited to try his world famous tomato pizza sauce.', pic:'sprites/tomato.png', fruit: 'tomato'},
	{title: 'Happy Halloween!', content: 'Join us at the community center for the anual pumpkin carving contest!', pic:'sprites/pumpkin.png', fruit: 'pumpkin'},
	{title: 'New Bunnies at the Zoo', content: 'Come meet the new litter of bunnies at the zoo. Pay $5 to feed them some carrots.', pic:'sprites/carrot.png', fruit: 'carrot'},
	{title: 'Join us for a BBQ!', content: 'There will be a BBQ hosted in town sqaure on Friday. Hamburgers, corn bread, and corn-on-th-cob will be served.', pic:'sprites/corn.png', fruit: 'corn'},
	{title: 'Jam Factory to Be Built', content: 'The Jam Factory will be finished in 3 days! Come by for a free sample of strawberry jam.', pic:'sprites/strawberry.png', fruit: 'strawberry'}
]
var randomIntForWeekW = randi(9);
var randomIntForWeekS = randi(5);
var amountSold = [
	{fruit:'corn', sold:0, expired:0},
	{fruit:'strawberry', sold:0, expired:0},
	{fruit:'carrot', sold:0, expired:0},
	{fruit:'tomato', sold:0, expired:0},
	{fruit:'pumpkin', sold:0, expired:0}
]



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

var sellPrices={
	'carrot':5,
	'corn':3,
	'strawberry':8,
	'pumpkin': 10,
	'tomato': 5
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
	
	loadSprite('bean', 'sprites/spritesheet.png', {
		sliceX: 10,
		sliceY: 1,
		anims: {
			runRight: { from: 8, to: 9 },
			runLeft: { from: 6, to: 7 },
			runDown: { from: 4, to: 5 },
			runUp: { from: 1, to: 2 },
			idle:4
		}
	})


	loadSprite("playerFront", "sprites/playerfront.png")
	loadSprite("playerBack", "sprites/playerback.png")
	loadSprite("playerLeft", "sprites/playerLeft.png")
	loadSprite("playerRight", "sprites/playerRight.png")

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
	
	
	const bean = add([
		sprite("bean", {
			animSpeed: 1,
			frame:4
		}),
		pos(225, 10),
		area(),
		body(),
		scale(.3),
		"bean"
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
	
	/******** MOVEMENT  ********/

	const SPEED = 70;

	let myInterval;
    const intervalTime=100

    function animateR() {
        clearInterval(myInterval)
    	myInterval = setInterval(() => {
        bean.play("runRight");
    }, intervalTime);
    }

    function animateL() {
        clearInterval(myInterval)
        myInterval = setInterval(() => {
            bean.play("runLeft");
        }, intervalTime);
        }

    function animateD() {
            clearInterval(myInterval)
            myInterval = setInterval(() => {
                bean.play("runDown");
            }, intervalTime);
        }

    function animateU() {
            clearInterval(myInterval)
            myInterval = setInterval(() => {
				bean.play("runUp");
            }, intervalTime);
        }
	
	onKeyPress("left", () => {
		animateL()
	})

	onKeyDown("left", () => {
		bean.move(-SPEED, 0)
	})
	
	onKeyPress("right", () => {
		animateR()		
	})

	onKeyDown("right", () => {
		bean.move(SPEED, 0)
	})

	onKeyPress("up", () => {
		animateU()		
	})

	onKeyDown("up", () => {
		bean.move(0, -SPEED)
	})
	
	onKeyPress("down", () => {
		animateD()	
	})

	onKeyDown("down", () => {
		bean.move(0, SPEED)
	})

	onKeyRelease("right",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("left",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("up",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("down",()=>{
        clearInterval(myInterval)
    })
	
	
	/****** COLLISION ******/
	var collidedBox = ""
	bean.onCollide("gardenbox1", (gardenbox1) => {
		collidedBox = "gardenbox1"
		if(gardenBoxContents[0]=="empty" && currentStep=="plant"){
			openSeedSelector();
		}
		if(gardenBoxStatus[0]=="dead"){
			removeDeadProduce(0);
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
			removeDeadProduce(1);
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
			removeDeadProduce(2);
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
			removeDeadProduce(3);
		}
		if(gardenBoxStatus[3]=="grown"){
			harvestProduce(3);
		}
		
	})
	
	//extra non kaboom stuff
	
	function openSeedSelector(){
		debug.log("Opened seed selector");
		var modal = document.getElementById("myModal");
	
		var btn = document.getElementById("myBtn");
	
		var span = document.getElementsByClassName("close")[0];
	
		modal.style.display = "block";
		debug.log("modal displayed");
		getPlayerSeedOptions()
	
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
		playerInventory[fruitType+'Seed']=playerInventory[fruitType+'Seed']-1;
		document.getElementById(fruitType+'SeedAmount').innerHTML=playerInventory[fruitType+'Seed'];

		if(gardenBoxStatus[0]=="planted" && gardenBoxStatus[1]=="planted" && gardenBoxStatus[2]=="planted" && gardenBoxStatus[3]=="planted"){
			playCutScene();
		}
		if(playerInventory['cornSeed']==0 && playerInventory['strawberrySeed']==0 && playerInventory['pumpkinSeed']==0 && playerInventory['tomatoSeed']==0 && playerInventory['carrotSeed']==0){
			playCutScene();
		}
		
	}

	function playCutScene(){
		//HAVE TO MOVE BEAN!!
		document.getElementById('gardenCutscene').style.display="block";
		document.getElementById('gardenCutscene').play();
		wait(10, () => {
			growSeed()
			document.getElementById('gardenCutscene').style.display="none";
		})
		destroy(bean);
		const bean = add([
			sprite("bean", {
				animSpeed: 1,
				frame:4
			}),
			pos(225, 225),
			area(),
			body(),
			scale(.3),
			"bean"
		])
		
	}

	function getPlayerSeedOptions(){
		var noSeeds = true;
		const fruitTypes = ['corn', 'strawberry', 'carrot', 'tomato', 'pumpkin']
		for(var i=0; i<5; i++){
			if(playerInventory[fruitTypes[i]+'Seed']==0){
				document.getElementById(fruitTypes[i]+'Button').style.display='none';
			}
			else {
				noSeeds = false;
			}
		}
		if (noSeeds) {
			document.getElementById("seedMessage").innerHTML = "You have no seeds. Visit the seed shop to purchase seeds!"
		}
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
						sprite(gardenBoxContents[i] + "deadbox"),
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
		if(fruitType == 'strawberry' && weatherOptions[randomIntForWeekW][0]=='cold'){
			return 0;
		}
		if(fruitType == 'corn' && weatherOptions[randomIntForWeekW][0]=='hot'){
			return 0;
		}
		if(fruitType == 'tomato' && weatherOptions[randomIntForWeekW][1]=='cloudy'){
			return 0;
		}
		if(fruitType == 'pumpkin' && weatherOptions[randomIntForWeekW][1]=='rainy'){
			return 0;
		}
		if(fruitType == 'carrot' && weatherOptions[randomIntForWeekW][1]=='sunny'){
			return 0;
		}
		return 1;
	}

	function probabilityOfSell(fruitType){
		var possibleProbs = [.4, .6, .8]
		
		if(stories[randomIntForWeekS].fruit==fruitType){
			return 1
		} else {
			return possibleProbs[randi(4)]
		}
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
		goToFarmersMarket()
		
	}

	function removeDeadProduce(index){
		destroy(gardenBoxes[index]);
	
		gardenBoxes[index] = add([
			pos(gardenBoxPositions[index]),
			sprite("gardenbox"),
			scale(.25),
			area(),
			body({ isStatic: true}),
			gardenBoxNames[index]
		])

		gardenBoxStatus[index] = "empty";
		gardenBoxContents[index] = "empty";

		var modal = document.getElementById("deadModal");
		modal.style.display = "block";
		document.getElementById("closeDeadModal").addEventListener("click", function() { document.getElementById("deadModal").style.display = "none";}, false);

	}

	document.getElementById("closeDeadModal").addEventListener("click", function() { console.log('entered function'); document.getElementById("deadModal").style.display = "none"; goToFarmersMarket();}, false);

	function goToFarmersMarket(){
		if(currentStep=="harvest" && gardenBoxContents[0]=="empty" && gardenBoxContents[1]=="empty" && gardenBoxContents[2]=="empty" && gardenBoxContents[3]=="empty"){
			//document.getElementById('gardenCutscene').style.display="block";
			//document.getElementById('gardenCutscene').play();
			sellProduce();
			console.log('sold produce:')
			for(var i=0; i<5; i++){
				console.log(amountSold[i].fruit)
				console.log('sold: '+amountSold[i].sold)
				console.log('expired: '+amountSold[i].expired)
			}
			
			wait(10, () => {
				document.getElementById('gardenCutscene').style.display="none";
				go("summary");
			})
		}
	}

	function sellProduce(){
		const fruitTypes = ['corn', 'strawberry', 'carrot', 'tomato', 'pumpkin'];
		var amountToSell = 0;
		var profit = 0;
		for(var i=0; i<5; i++){
			if(playerInventory[fruitTypes[i]]>=0){
				amountToSell = probabilityOfSell(fruitTypes[i])*playerInventory[fruitTypes[i]];
				amountSold[i].sold=amountToSell;
				profit += amountToSell*sellPrices[fruitTypes[i]];
				amountSold[i].expired=playerInventory[fruitTypes[i]]-amountToSell;
				playerInventory[fruitTypes[i]]=0;
			} else {
				amountSold[i].sold=0
				amountSold[i].expired=0

			}
	}
	updatePlayerBank(profit)
	}
}) 

scene("newspaper", () => {
	loadSprite("background", "sprites/gardenbackground.png");
	loadSprite("newspaperStand", "sprites/newspaperStand.png")
	loadSprite("seedsStand", "sprites/seedStand.png")
	loadSprite("seeds", "sprites/corngrownbox.png")
	loadSprite("gardenSign", "sprites/gardenSign.png")

	var visitedNews = false;

	loadSprite('bean', 'sprites/spritesheet.png', {
		sliceX: 10,
		sliceY: 1,
		anims: {
			runRight: { from: 8, to: 9 },
			runLeft: { from: 6, to: 7 },
			runDown: { from: 4, to: 5 },
			runUp: { from: 1, to: 2 },
			idle:3
		}
	})

	// Create a background entity
	const background = add([
		sprite("background"), // Use the loaded background image
		pos(0, 0),
		scale(.52), // Adjust the scale if needed
		]);

	var newspaperStand = add([
		pos(20, 40),
		sprite("newspaperStand"),
		scale(.2),
		area(),
		body({ isStatic: true}),
		"newspaperStand"
	])

	var seedsStand = add([
		pos(320, 40),
		sprite("seedsStand"),
		scale(.2),
		area(),
		body({ isStatic: true}),
		"seedsStand"
	])


	const bean = add([
		sprite("bean", {
			animSpeed: 1,
			frame:0
		}),
		pos(225, 225),
		area(),
		body(),
		scale(.3),
		"bean"
	])

	const SPEED = 70;
	
	/******** MOVEMENT  ********/

	let myInterval;
    const intervalTime=300

    function animateR() {
        clearInterval(myInterval)
    	myInterval = setInterval(() => {
        bean.play("runRight");
    }, intervalTime);
    }

    function animateL() {
        clearInterval(myInterval)
        myInterval = setInterval(() => {
            bean.play("runLeft");
        }, intervalTime);
        }

    function animateD() {
            clearInterval(myInterval)
            myInterval = setInterval(() => {
                bean.play("runDown");
            }, intervalTime);
        }

    function animateU() {
            clearInterval(myInterval)
            myInterval = setInterval(() => {
				bean.play("runUp");
            }, intervalTime);
        }
	
	onKeyPress("left", () => {
		animateL()
	})

	onKeyDown("left", () => {
		bean.move(-SPEED, 0)
	})
	
	onKeyPress("right", () => {
		animateR()		
	})

	onKeyDown("right", () => {
		bean.move(SPEED, 0)
	})

	onKeyPress("up", () => {
		animateU()		
	})

	onKeyDown("up", () => {
		bean.move(0, -SPEED)
	})
	
	onKeyPress("down", () => {
		animateD()	
	})

	onKeyDown("down", () => {
		bean.move(0, SPEED)
	})

	onKeyRelease("right",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("left",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("up",()=>{
        clearInterval(myInterval)
    })

    onKeyRelease("down",()=>{
        clearInterval(myInterval)
    })
	
	bean.onCollide("seedsStand", () => {
		openSeedShop();
	})

	bean.onCollide("newspaperStand", () => {
		openNewspaper();
	})

	bean.onCollide("gardenSign", ()=> {

		go("garden")
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
		ifEnoughMoneyToBuy();
		createGardenSign();
	}

	function openSeedShop(){
		ifEnoughMoneyToBuy();
		document.getElementById("buySeedsModal").style.display = "block";
		var modal = document.getElementById("buySeedsModal");
		var span = document.getElementsByClassName("close")[1];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}
	}

	function ifEnoughMoneyToBuy(){
		const fruitTypes = ['corn', 'strawberry', 'carrot', 'tomato', 'pumpkin']
		for(var i=0; i<5; i++){
			if(playerBank<seedCosts[fruitTypes[i]]){
				document.getElementById(fruitTypes[i]+'SeedB').disabled=true;
				document.getElementById(fruitTypes[i]+'SeedB').style.backgroundColor='#d3d3d3';
			}
		}
	}

	function openNewspaper(){
		visitedNews = true;
		createGardenSign();
		document.getElementById("newspaperModal").style.display = "block";

    	document.getElementById("tempP").innerHTML = '&#x1F321;: ' + weatherOptions[randomIntForWeekW][0];

    	document.getElementById("conditionsP").innerHTML = '&#x2600;: ' + weatherOptions[randomIntForWeekW][1];

		document.getElementById("newsTitle").innerHTML = stories[randomIntForWeekS].title;

    	document.getElementById("newsParagraph").innerHTML = stories[randomIntForWeekS].content;
    	document.getElementById("newsPic").src = stories[randomIntForWeekS].pic;
		

		var modal = document.getElementById("newspaperModal");

		var span = document.getElementsByClassName("close")[2];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		modal.style.display = "none";
		}
	}

	function createGardenSign(){
		var hasSeeds = false;
		const fruitTypes = ['corn', 'strawberry', 'carrot', 'tomato', 'pumpkin'];
		for(var i=0; i<5; i++){
			if(playerInventory[fruitTypes[i]+'Seed']>0){
				hasSeeds = true;
			}
		}
		if(visitedNews && hasSeeds){
			const gardenSign = add([
				pos(270, 415),
				sprite("gardenSign"),
				scale(.15),
				area(),
				body({ isStatic: true}),
				"gardenSign"
			])
		}
	}
	
})

scene("summary", () => {

})

updatePlayerBank(0);
go("newspaper");
