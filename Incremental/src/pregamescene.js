class PregameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'PregameScene' });
	}

	preload() {

	}

	create() {
		gameState.preGameText = this.add.text(150, 135, "Welcome to Genny gen", { fill: "#222222", font: "20px Fira Code"})

	}

	update() {
		
	}

}
