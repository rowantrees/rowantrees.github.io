const gameState = {
	speed: 1000,
	width: 1060,
	height: 800,
	score: 0,
	perTick: 1,
	perClick: 1,
	generators: [0,0,0,0,0],
	genMulti: [1,1,1,1,1],

	onTick: function() {
		score += this.perTick;
		this.generate();
	},

	onClick: function() {

	},

	generate: function() {
		for (let i=0; i<this.generators.length; i++) {
			if (i === 0) {
				this.score += this.generators[i] * this.genMulti[i];
			}
			else {
				this.generators[i-1] += this.generators[i] * this.genMulti[i];
			}
		}

	}
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  fps: {target: 60},
  backgroundColor: "090909",
  scene: [pregameScene, genScene, configScene]
};

const game = new Phaser.Game(config);

