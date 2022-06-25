class PregameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'PregameScene' });
	}

	preload() {


	}

	create() {
		gameState.rect = this.add.rectangle(250,135,200,50,0xFFFFFF);
		gameState.preGameText = this.add.text(150, 135, "Welcome to Genny gen", { fill: "#222222", font: "20px Fira Code"})
		gameState.playRect = this.add.rectangle(400, 300, 125, 50, 0xCABACA);
		gameState.playText = this.add.text(350, 275, "Click to play", { fill: "#222222", font: "20px Fira Code"})
		gameState.playRect.setInteractive();
		gameState.playRect.on('pointerup', function() {
			this.
		});
	}

	update() {

		
	}

}
