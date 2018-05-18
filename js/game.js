document.onreadystatechange = function () {
    var WIDTH = 1920;
    var HEIGHT = 1080;

    if (document.readyState == "complete") {
        var game = new PixelJS.Engine();
        game.init({
            container: 'game_container',
            width: WIDTH,
            height: HEIGHT
        });

        var backgroundLayer = game.createLayer('background');
        var grass = backgroundLayer.createEntity();
        backgroundLayer.static = true;
        grass.pos = { x: 0, y: 0 };
        grass.asset = new PixelJS.Tile();
        grass.asset.prepare({
            // name: 'grass.png',
            // size: {
            //     width: 800,
            //     height: 600
            // }
            name: 'map2.png',
            size: {
                width: 2560,
                height: 1600
            }
        });
        var itemLayer = game.createLayer('items');

        var cow = itemLayer.createEntity();
        cow.pos = { x: 1060, y: 840 };
        cow.size = { width: 45, height: 45 };
        cow.asset = new PixelJS.AnimatedSprite();
        cow.asset.prepare({
            name: 'cow4.png',
            frames: 1,
            rows: 2,
            speed: 160,
            defaultFrame: 0
        });

        var horse = itemLayer.createEntity();
        horse.pos = { x: 1460, y: 155 };
        horse.size = { width: 150, height: 150 };
        horse.asset = new PixelJS.AnimatedSprite();
        horse.asset.prepare({
            name: 'horse9.png',
            frames: 1,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var mary = itemLayer.createEntity();
        mary.pos = { x: 318, y: 700 };
        mary.size = { width: 150, height: 160 };
        mary.asset = new PixelJS.AnimatedSprite();
        mary.asset.prepare({
            name: 'mary-02.png',
            frames: 3,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var bounce = itemLayer.createEntity();
        bounce.pos = { x: 1452, y: 458 };
        bounce.size = { width: 65, height: 200 };
        bounce.asset = new PixelJS.AnimatedSprite();
        bounce.asset.prepare({
            name: 'bounce4.png',
            frames: 5,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var playerLayer = game.createLayer('players');
        var player = new PixelJS.Player();
        player.addToLayer(playerLayer);
        player.pos = { x: 715, y: 715 };
        player.size = { width: 150, height: 150 };
        player.velocity = { x: 375, y: 375 };
        player.asset = new PixelJS.AnimatedSprite();
        player.asset.prepare({
            name: 'robin-01.png',
            frames: 3,
            rows: 4,
            speed: 100,
            defaultFrame: 1
        });

        var coin = itemLayer.createEntity();
        coin.pos = { x: -400, y: 150 };
        coin.size = { width: 12, height: 16 };
        coin.asset = new PixelJS.AnimatedSprite();
        coin.asset.prepare({
            name: 'coin.png',
            frames: 8,
            rows: 1,
            speed: 80,
            defaultFrame: 0
        });

        var horseBubble = itemLayer.createEntity();
        horseBubble.pos = { x: -200, y: -200 };
        horseBubble.size = { width: 12, height: 16 };
        horseBubble.asset = new PixelJS.AnimatedSprite();
        horseBubble.asset.prepare({
            name: 'speech_horse.png',
            frames: 1,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var cowBubble = itemLayer.createEntity();
        cowBubble.pos = { x: -200, y: -200 };
        cowBubble.size = { width: 12, height: 16 };
        cowBubble.asset = new PixelJS.AnimatedSprite();
        cowBubble.asset.prepare({
            name: 'speech_cow.png',
            frames: 1,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var maryBubble = itemLayer.createEntity();
        maryBubble.pos = { x: -200, y: -200 };
        maryBubble.size = { width: 12, height: 16 };
        maryBubble.asset = new PixelJS.AnimatedSprite();
        maryBubble.asset.prepare({
            name: 'speech_mary.png',
            frames: 1,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var bounceBubble = itemLayer.createEntity();
        bounceBubble.pos = { x: -200, y: -200 };
        bounceBubble.size = { width: 12, height: 16 };
        bounceBubble.asset = new PixelJS.AnimatedSprite();
        bounceBubble.asset.prepare({
            name: 'speech_bounce.png',
            frames: 1,
            rows: 1,
            speed: 160,
            defaultFrame: 0
        });

        var collectSound = game.createSound('collect');
        collectSound.prepare({ name: 'coin.mp3' });

        var birdSound = game.createSound('bird');
        birdSound.prepare({ name: 'birds.mp3' });

        var cowSound = game.createSound('cow');
        cowSound.prepare({ name: 'cow.mp3' });

        var marySound = game.createSound('mary');
        marySound.prepare({ name: 'mary.mp3' });

        var bounceSound = game.createSound('bounce');
        bounceSound.prepare({ name: 'bounce.mp3' });

        var horseSound = game.createSound('horse');
        horseSound.prepare({ name: 'horse.mp3' });


        player.onCollide(function (entity) {
            console.log(entity);
            if (entity === horse) {
                horseSound.play();
            }

            if (entity === cow) {
                cowSound.play();
            }

            if (entity === mary) {
                marySound.play();
            }

            if (entity === bounce) {
                bounceSound.play();
            }

            if (entity === coin) {
                collectSound.play();
                coin.pos = {
                    x: Math.floor(Math.random() * (WIDTH - 100 + 1) + 100),
                    y: Math.floor(Math.random() * (HEIGHT - 100 + 1) + 100)
                };
                //
                // score += 1;
                // scoreLayer.redraw = true;
                // scoreLayer.drawText(
                //     'Coins: ' + score,
                //     50,
                //     50,
                //     '14pt "Trebuchet MS", Helvetica, sans-serif',
                //     '#FFFFFF',
                //     'left'
                // );
            }
        });

        playerLayer.registerCollidable(player);
        itemLayer.registerCollidable(coin);
        itemLayer.registerCollidable(cow);
        itemLayer.registerCollidable(horse);
        itemLayer.registerCollidable(mary);
        itemLayer.registerCollidable(bounce);

        var showPosition = function(){
            scoreLayer.redraw = true;
            scoreLayer.drawText(
                'x: ' + Math.round(player.pos.x) + " y:" + Math.round(player.pos.y),
                25,
                25,
                '12pt "Trebuchet MS", Helvetica, sans-serif',
                '#ededed',
                'left'
            );
        };

        // var score = 0;
        var scoreLayer = game.createLayer("score");
        scoreLayer.static = true;
        game.on('keyDown', showPosition);
        game.on('keyUp', showPosition);

        game.loadAndRun(function (elapsedTime, dt) {
            if (player.collidesWith(horse)) {
                horseBubble.pos = { x: horse.pos.x - 50, y: horse.pos.y - 85 };
            } else {
                horseBubble.pos = { x: -200, y: -200 };
            }

            if (player.collidesWith(cow)) {
                cowBubble.pos = { x: cow.pos.x - 50, y: cow.pos.y - 85 };
            } else {
                cowBubble.pos = { x: -200, y: -200 };
            }

            if (player.collidesWith(mary)) {
                maryBubble.pos = { x: mary.pos.x - 50, y: mary.pos.y - 185 };
            } else {
                maryBubble.pos = { x: -200, y: -200 };
                marySound.pause();
                marySound.seek(0);
            }

            if (player.collidesWith(bounce)) {
                bounceBubble.pos = { x: bounce.pos.x + 25, y: bounce.pos.y - 55 };
            } else {
                bounceBubble.pos = { x: -200, y: -200 };
                bounceSound.pause();
                bounceSound.seek(0);
            }
        });
    }
}

