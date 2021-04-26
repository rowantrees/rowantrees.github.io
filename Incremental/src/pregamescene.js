class pregameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
		this.sceneKey = key;
	}

	preload() {

	}

	create() {
		gameState.preGameText = this.add.text(150, 135, "Welcome to Genny gen", { fill: "#222222", font: "20px Fira Code"})

	}

	update() {
		
	}

}
