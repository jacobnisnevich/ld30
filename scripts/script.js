function init() {
    var interactive = true;
    var stage = new PIXI.Stage(0x111111, interactive);
    var width = document.getElementById("game-canvas").width;
    var height = document.getElementById("game-canvas").height;
    renderer = PIXI.autoDetectRenderer(width, height, document.getElementById("game-canvas"));
    renderer.render(stage);

    var farTexture = PIXI.Texture.fromImage("images/background_far.png");
    far = new PIXI.TilingSprite(farTexture, 800, 600);
    far.position.x = 0;
    far.position.y = 0;
    far.tilePosition.x = 0;
    far.tilePosition.y = 0;
    stage.addChild(far);

    var midTexture = PIXI.Texture.fromImage("images/background_near.png");
    mid = new PIXI.TilingSprite(midTexture, 800, 600);
    mid.position.x = 0;
    mid.position.y = 0;
    mid.tilePosition.x = 0;
    mid.tilePosition.y = 0;
    stage.addChild(mid);

    var ballTexture = PIXI.Texture.fromImage("images/bowling_ball.png");
    var ball = new PIXI.Sprite(ballTexture);
    mid.setInteractive(true);

    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;

    ball.position.x = 200;
    ball.position.y = 150;

    stage.addChild(ball);

    mid.click = function(mouseData) {
       ball.position.y -= 5;
    }

    var platformTexture = PIXI.Texture.fromImage("images/platform.png");
    var platform = new PIXI.Sprite(platformTexture);

    platform.anchor.x = 0.5;
    platform.anchor.y = 0.5;

    platform.position.x = 200;
    platform.position.y = 300;

    stage.addChild(platform);

    var bowlingPinTexture = PIXI.Texture.fromImage("images/bowling_pin.png");

    var dir = "down";
    var key = "NULL";

    function doKeyDown(evt){
        switch (evt.keyCode) {
    //      case 38:  /* Up arrow was pressed */
    //          dir = "up";
    //          break;
    //      case 40:  /* Down arrow was pressed */
    //          dir = "down";
    //          break;
            case 37:  /* Left arrow was pressed */
                key = "left";
                break;
            case 39:  /* Right arrow was pressed */
                key = "right";
                break;
        }
    }

    window.addEventListener('keydown', doKeyDown, true);

    var gameSpeed = 4;
    var ballSpeed = 0.1;
    var gravityRatio = 1.05;
    var scoreCounter = 0;

    var score = new PIXI.Text("0", {font:"36px Arial", fill:"black"});
    stage.addChild(score);

    function createBowlingPin() {
        var chance = Math.floor(Math.random(0,100) * 100);
        if (chance == 1) {
        var bowlingPin = new PIXI.Sprite(bowlingPinTexture);
        bowlingPin.anchor.x = .05;
        bowlingPin.anchor.y = 0.5;
        bowlingPin.position.x = 400;
        bowlingPin.position.y = 300;
        }
    }

    function hitTest(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 + w1 > x2)
            if (x1 < x2 + w2)
                if (y1 + h1 > y2)
                    if (y1 < y2 + h2)
                        return true;
        return false;
    };

    function moveBall(key, dir) {
        if (key == "left") {
            ball.position.x -= gameSpeed;
        }
        else if (key == "right") {
            ball.position.x += gameSpeed;
        }
        if (dir == "up") {
            ballSpeed = ballSpeed / gravityRatio;
            ball.position.y -= ballSpeed;
        }
        else {
            ballSpeed = ballSpeed * gravityRatio;
            ball.position.y += ballSpeed;
        }
        return "NULL";
    }

    function ballGravity(dir) {
        if (dir == "up") {
            if (ballSpeed > 0.1) {
                ball.position.y -= ballSpeed;
                ballSpeed = ballSpeed / gravityRatio;
                return "up";
            }
            else {
                return "down";
            }
        }
        else if (dir == "down") {
            ball.position.y += ballSpeed;
            ballSpeed = ballSpeed * gravityRatio * 2;
            return "down";
        }
    }

    function flipDir(dir) {
        if (dir == "up") {
            dir = "down";
        }
        else if (dir == "down") {
            dir = "up";
        }
        else if (dir == "left") {
            dir = "right";
        }
        else if (dir == "right") {
            dir = "left";
        }
    }

    function spawnPlatforms() {
        // TODO
    }

    requestAnimFrame(update);

    function update() {
        far.tilePosition.x -= 0.128;
        mid.tilePosition.x -= 0.64;
        // platform.position.x -= (gameSpeed/2); 

        if (hitTest(ball.position.x, ball.position.y, ball.width, ball.height, platform.position.x, platform.position.y, platform.width, platform.height)) {
            dir = "up";
            ballSpeed = 5;
            scoreCounter++;
            score.setText(scoreCounter)
        }

        if (key != "NULL")
            key = moveBall(key, dir);

        dir = ballGravity(dir);

        createBowlingPin();

        renderer.render(stage);

        requestAnimFrame(update);
    }
}
