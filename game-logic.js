const shapeList = ["⯀", "▲", "⬤", "⬣", "⬧", "⭓", "⯄", "⯍"];

const score = {
  "1": 0,
}

function duelLists() {
  
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
  }
  return shuffled;
}

function createShape(symbol, playerNumber) {
  let shape = document.createElement("div");
  shape.className = "shape-" + playerNumber;
  shape.innerText = symbol;
  return shape;
}

function wipeIn(element) {
  return new Promise(resolve => resolve(element.classList.add('wipe-in')));
}

function wipeOut(element, player) {
  element.classList.add('wipe-out')
  delay(200).then(() => element.classList = player)
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let rolling = false;
function roll(playerNumber) {
	if (rolling) {
  	return;
  }
  
  playerClass = "shape-" + playerNumber;
	rolling = true;
  
	let shapes = document.getElementsByClassName(playerClass);
  for (let i = 0; i < shapes.length; i++) {
  	shapes[i].classList = playerClass
  }
  
  let chain = new Promise(resolve => resolve());
  for (let i = 0; i < 3; i++ ){
  	idx = Math.floor(Math.random() * shapes.length)
  	const el = shapes[idx];
  	chain = chain
    	.then(() => wipeIn(el))
      
    if (i < 2) {
    	chain = chain
        .then(() => delay(150))
				.then(() => wipeOut(el, playerClass))
        .then(() => delay(150));
    }
  }
  chain.then(() => rolling = false);
}

const container = document.getElementById("game");
shuffleArray(
	shapeList.map(symbol => createShape(symbol, 1))
  	.concat(shapeList.map(symbol => createShape(symbol, 1)))
  	.concat(shapeList.map(symbol => createShape(symbol, 1)))
  	.concat(shapeList.map(symbol => createShape(symbol, 1)))
  	.concat(shapeList.map(symbol => createShape(symbol, 1)))
)
	.forEach((el) => container.appendChild(el));
roll(1);
