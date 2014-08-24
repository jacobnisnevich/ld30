function init() {
    var interactive = true;
    var stage = new PIXI.Stage(0x111111, interactive);
    var width = document.getElementById("game-canvas").width;
    var height = document.getElementById("game-canvas").height;
    renderer = PIXI.autoDetectRenderer(width, height, document.getElementById("game-canvas"));
    renderer.render(stage);

    var dir = "down";
    var key = "NULL";

    window.addEventListener('keydown', doKeyDown, true);

    var gameSpeed = 4;
    var ballSpeed = 0.1;
    var gravityRatio = 1.05;
    var scoreCounter = 0;
    var score = new PIXI.Text("0", {font:"36px Arial", fill:"black"});
    stage.addChild(score);
    var platforms = new Array();
    spawn = 100;

    addBackground();
    addBall();
    requestAnimFrame(update);

    // var bowlingPinTexture = PIXI.Texture.fromImage("images/bowling_pin.png");

//    function createBowlingPin() {
//        var chance = Math.floor(Math.random(0,100) * 100);
//        if (chance == 1) {
//        var bowlingPin = new PIXI.Sprite(bowlingPinTexture);
//        bowlingPin.anchor.x = .05;
//        bowlingPin.anchor.y = 0.5;
//        bowlingPin.position.x = 800;
//        bowlingPin.position.y = 300;
//        }
//    }

    function addBackground() {
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
    }

    function addBall() {
        var ballTexture = PIXI.Texture.fromImage("images/bowling_ball.png");
        var ball = new PIXI.Sprite(ballTexture);
        mid.setInteractive(true);

        ball.anchor.x = 0.5;
        ball.anchor.y = 0.5;

        ball.position.x = 700;
        ball.position.y = 100;

        stage.addChild(ball);
    }

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
            ballSpeed = ballSpeed * gravityRatio;
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

    function spawnPlatforms(spawn, platforms) {
        var spawnPosY = 200 + (Math.floor(Math.random() * 200));
        if (spawn == 125) {
            var platformTexture = PIXI.Texture.fromImage("images/platform.png");
            var platform = new PIXI.Sprite(platformTexture);

            platform.anchor.x = 0.5;
            platform.anchor.y = 0.5;
            platform.position.x = 800;
            platform.position.y = spawnPosY;

            stage.addChild(platform);

            platforms.push(platform);

            return 0;
        }
        return spawn + 1;
    }

    function update() {
        far.tilePosition.x -= 0.128;
        mid.tilePosition.x -= 0.64;
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].position.x -= (gameSpeed/2); 
        
            if (hitTest(ball.position.x, ball.position.y, ball.width, ball.height, platforms[i].position.x, platforms[i].position.y, platforms[i].width, platforms[i].height)) {
                dir = "up";
                ballSpeed = 5;
                scoreCounter++;
                score.setText(scoreCounter);
            }
        }

        if (key != "NULL")
            key = moveBall(key, dir);

        spawn = spawnPlatforms(spawn, platforms)

        dir = ballGravity(dir);
        createBowlingPin();

        renderer.render(stage);

        requestAnimFrame(update);
    }
}
