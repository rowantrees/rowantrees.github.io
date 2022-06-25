class Gen{
	constructor(qty, cost, prod, multi){
		this.amount = qty;
		this.cost = cost;
		this.prod = prod;
		this.multi = multi;
	}

	getPerTick(){
		return this.prod * this.multi;
	}
}

let gameState = {
	score: 1,
	gens: [new Gen(0, 10, 1, 1), new Gen(0, 10000, 10, 2)],
	perTick: 1
};

function updatePerTick(){
	let amount = 0;
	for (let i=0; i<gameState.gens.length;i++){

		amount += gameState.gens[i].prod * gameState.gens[i].amount * gameState.gens[i].multi;

	}
	gameState.perTick = amount;
}

function updateGenDisplay() {
		for (let i=0; i<gameState.gens.length;i++){
			console.log("gen"+i);
			let element = document.getElementById("gen"+i);
			element.textContent = 'amount: ' + Math.floor(gameState.gens[i].amount) + ' cost: ' + Math.floor(gameState.gens[i].cost) + ' multi: ' + gameState.gens[i].multi;
		}
}

function updateScoreDisplay() {
    let element = document.getElementById("score");
    element.textContent = Math.floor(gameState.score) + " score";
}

function earnScore() {
	gameState.score += gameState.perTick;
}


document.getElementById('gen0').onclick = function () {
	if (gameState.score >= gameState.gens[0].cost) {
		gameState.score -= gameState.gens[0].cost;
		gameState.gens[0].amount += 1;
		gameState.gens[0].cost *= 1.1;
		gameState.gens[0].multi = Math.floor(gameState.gens[0].amount / 10) + 1;
		updatePerTick();
	}
}






function init(){
	console.log('init');
	updateScoreDisplay();
	updateGenDisplay();
}

init();

window.addEventListener('keyup', function(event) {
   if (event.keyCode === 81) {
   		clearInterval(mainLoop);
   }
});

let mainLoop = setInterval( function() {
		earnScore();
		updateScoreDisplay();
		updateGenDisplay();
	}, 100);