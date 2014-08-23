function init() {
    var stage = new PIXI.Stage(0x66FF99);
    var width = document.getElementById("game-canvas").width;
    var height = document.getElementById("game-canvas").height;
    renderer = PIXI.autoDetectRenderer(width, height, document.getElementById("game-canvas"));
    renderer.render(stage);
}