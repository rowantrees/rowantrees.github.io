const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  fps: {target: 60},
  backgroundColor: "090909",
  scene: [pregameScene, genScene, configScene]
};