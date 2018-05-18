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
            name: 'map7.png',
            size: {
                width: 2560,
                height: 1600
            }
        });
        var itemLayer = game.createLayer('items');

        var cow = itemLayer.createEntity();
        cow.pos = { x: 400, y: 420 };
        cow.size = { width: 30, height: 30 };
        cow.asset = new PixelJS.AnimatedSprite();
        cow.asset.prepare({
            name: 'cow.png',
            frames: 3,
            rows: 4,
            speed: 160,
            defaultFrame: 0
        });

        var horse = itemLayer.createEntity();
        horse.pos = { x: 470, y: 320 };
        horse.size = { width: 30, height: 30 };
        horse.asset = new PixelJS.AnimatedSprite();
        horse.asset.prepare({
            name: 'horse.png',
            frames: 4,
            rows: 3,
            speed: 160,
            defaultFrame: 0
        });

        var playerLayer = game.createLayer('players');
        var player = new PixelJS.Player();
        player.addToLayer(playerLayer);
        player.pos = { x: 354, y: 363 };
        player.size = { width: 32, height: 32 };
        player.velocity = { x: 100, y: 100 };
        player.asset = new PixelJS.AnimatedSprite();
        player.asset.prepare({
            name: 'char2.png',
            frames: 3,
            rows: 4,
            speed: 100,
            defaultFrame: 1
        });

        var coin = itemLayer.createEntity();
        coin.pos = { x: 400, y: 150 };
        coin.size = { width: 12, height: 16 };
        coin.asset = new PixelJS.AnimatedSprite();
        coin.asset.prepare({
            name: 'coin.png',
            frames: 8,
            rows: 1,
            speed: 80,
            defaultFrame: 0
        });


        var collectSound = game.createSound('collect');
        collectSound.prepare({ name: 'coin.mp3' });

        var birdSound = game.createSound('bird');
        birdSound.prepare({ name: 'birds.mp3' });

        var cowSound = game.createSound('cow');
        cowSound.prepare({ name: 'cow.mp3' });

        var horseSound = game.createSound('horse');
        horseSound.prepare({ name: 'horse.mp3' });


        player.onCollide(function (entity) {
            console.log(entity);
            if (entity === horse) {
                horseSound.play();
                // horse.delete();
            }

            if (entity === cow) {
                cowSound.play();
                // horse.delete();
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

        var showPosition = function(){
            scoreLayer.redraw = true;
            scoreLayer.drawText(
                'x: ' + Math.round(player.pos.x) + " y:" + Math.round(player.pos.y),
                50,
                50,
                '14pt "Trebuchet MS", Helvetica, sans-serif',
                '#FFFFFF',
                'left'
            );
        };

        var score = 0;
        var scoreLayer = game.createLayer("score");
        scoreLayer.static = true;
        game.on('keyDown', showPosition);
        game.on('keyUp', showPosition);

        game.loadAndRun(function (elapsedTime, dt) {
        });
    }
}

