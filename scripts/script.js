function init() {
    var stage = new PIXI.Stage(0x66FF99);
    var width = document.getElementById("game-canvas").width;
    var height = document.getElementById("game-canvas").height;
    renderer = PIXI.autoDetectRenderer(width, height, document.getElementById("game-canvas"));
    renderer.render(stage);

    var farTexture = PIXI.Texture.fromImage("images/background.png");
      far = new PIXI.Sprite(farTexture);
      far.position.x = 0;
      far.position.y = 0;
      stage.addChild(far);
}