function init() {
    var interactive = true;
    var initialStage = new PIXI.Stage(0xEAEAEA, interactive);
    var width = document.getElementById("game-canvas").width;
    var height = document.getElementById("game-canvas").height;
    renderer = PIXI.autoDetectRenderer(width, height, document.getElementById("game-canvas"));

    function clearStage(stage) {
        for (var i = stage.children.length - 1; i >= 0; i--) {
            stage.removeChild(stage.children[i]);
        };
    }

    var zerTexture = PIXI.Texture.fromImage("images/menu_0.png");
    zer = new PIXI.TilingSprite(zerTexture, 800, 600);
    zer.position.x = 0;
    zer.position.y = 0;
    zer.tilePosition.x = 0;
    zer.tilePosition.y = 0;
    initialStage.addChild(zer);

    var oneTexture = PIXI.Texture.fromImage("images/menu_1.png");
    one = new PIXI.TilingSprite(oneTexture, 800, 600);
    one.position.x = 0;
    one.position.y = 0;
    one.tilePosition.x = 0;
    one.tilePosition.y = 0;
    initialStage.addChild(one);

    var twoTexture = PIXI.Texture.fromImage("images/menu_2.png");
    two = new PIXI.TilingSprite(twoTexture, 800, 600);
    two.position.x = 0;
    two.position.y = 0;
    two.tilePosition.x = 0;
    two.tilePosition.y = 0;
    initialStage.addChild(two);

    var thrTexture = PIXI.Texture.fromImage("images/menu_3.png");
    thr = new PIXI.TilingSprite(thrTexture, 800, 600);
    thr.position.x = 0;
    thr.position.y = 0;
    thr.tilePosition.x = 0;
    thr.tilePosition.y = 0;
    initialStage.addChild(thr);

    var fouTexture = PIXI.Texture.fromImage("images/menu_4.png");
    fou = new PIXI.TilingSprite(fouTexture, 800, 600);
    fou.position.x = 0;
    fou.position.y = 0;
    fou.tilePosition.x = 0;
    fou.tilePosition.y = 0;
    initialStage.addChild(fou);

    var playTexture = PIXI.Texture.fromImage("images/button_play.png");
    var playHover = PIXI.Texture.fromImage("images/button_play_light.png");
    var play = new PIXI.Sprite(playTexture);
    play.setInteractive(true);
    play.buttonMode = true;
    play.anchor.x = 0.5;
    play.anchor.y = 0.5;
    play.position.x = 400;
    play.position.y = 450;
    initialStage.addChild(play);

    requestAnimFrame(menuLoop);

    function menuLoop() {
        renderer.render(initialStage);

        zer.tilePosition.x -= 0.64;
        one.tilePosition.x += 0.64;
        two.tilePosition.x -= 0.64;
        thr.tilePosition.x += 0.64;
        fou.tilePosition.x -= 0.64;

        play.click = function(mouseData) {
            clearStage(initialStage);
            start();
        }

        play.mouseover = function(mouseData) {
            play.setTexture(playHover);
        }

        play.mouseout = function(mouseData) {
            play.setTexture(playTexture);
        }

        requestAnimFrame(menuLoop);
    }

    function start() {
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
        var platforms = new Array();
        var platformHit = new Array();
        spawn = 100;

        requestAnimFrame(update);

    //    var bowlingPinTexture = PIXI.Texture.fromImage("images/bowling_pin.png");

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

        // add background
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

        // add ball
        var ballTexture = PIXI.Texture.fromImage("images/bowling_ball.png");
        var ball = new PIXI.Sprite(ballTexture);
        mid.setInteractive(true);
        ball.anchor.x = 0.5;
        ball.anchor.y = 0.5;
        ball.position.x = 700;
        ball.position.y = 100;

        stage.addChild(ball);

        // add score counter
        var score = new PIXI.Text("0", {font:"36px Arial", fill:"black"});
        stage.addChild(score);

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
                platform.position.x = 840;
                platform.position.y = spawnPosY;

                stage.addChild(platform);

                platforms.push(platform);
                platformHit.push(false);

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
                    if (!platformHit[i]) {
                        scoreCounter++;
                        score.setText(scoreCounter);
                        platformHit[i] = true;
                    }
                }
            }

            if (key != "NULL")
                key = moveBall(key, dir);

            spawn = spawnPlatforms(spawn, platforms)

            dir = ballGravity(dir);

            //createBowlingPin();

            renderer.render(stage);

            requestAnimFrame(update);
        }
    }
}
