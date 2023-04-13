/**
 * Variables used during the game.
 */
let pause = false;
let player;
let enemy;

let cursors;
let background;
let background2;
let bullets = [];
let elapsedFrames = 0;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
  this.load.image("enemy2", "assets/characters/alien2.png");
  this.load.image("enemy3", "assets/characters/alien3.png");
  this.load.image("enemy4", "assets/characters/alien4.png");
  this.load.image("gameover", "assets/banners/game-over.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2 = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2.setY(background2.y - background.height);

  // banner gameOver
  gameOver = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "gameover");

  gameOver.setX(SCREEN_WIDTH + gameOver.width);
  gameOver.setY(SCREEN_HEIGHT + gameOver.height);

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);

  // enemy setup
  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();
  // spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // MAPEAR TECLAS
// spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/**
 * Updates each game object of the scene.
 */

function update() {
  elapsedFrames++;
  movePlayer();
  moveBackground();
  moveEnemy();
  spawnBullets(this);
  moveBullets();

  spawnEnemy(this);

  // destroyEnemy()
  // gameOver()
}





function moveEnemy() {
  enemy.setY(enemy.y + ENEMY_VELOCITY);
  if (enemy.x >= player.x) {
    enemy.setX(enemy.x - ENEMY_VELOCITY);
  }
  if (enemy.x <= player.x) {
    enemy.setX(enemy.x + ENEMY_VELOCITY);
  }
}

function moveBullets() {
  for (const bullet of bullets) {
   
    bullet.setY(bullet.y - BULLET_VELOCITY);
    if(bullet.y < 0){

      // bullet.destroy()
    }
    
    destroyEnemy(bullet)
   

  }
}

function gameOver() {
  if (
    player.x + (player.width * PLAYER_SCALE) / 2 >=
      enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
    player.x - (player.width * PLAYER_SCALE) / 2 <=
      enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
    player.y + (player.height * PLAYER_SCALE) / 2 >=
      enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
    player.y - (player.height * PLAYER_SCALE) / 2 <=
      enemy.y + (enemy.height * ENEMY_SCALE) / 2
  ) {
    player.destroy();
    gameOver.setX(SCREEN_WIDTH / 2);
    gameOver.setY(SCREEN_HEIGHT / 2);
  }
}

function destroyEnemy(bullet) {
  
    if (
      bullet.x  >=
        enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
        bullet.x  <=
        enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
        bullet.y >=
        enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
        bullet.y  <=
        enemy.y + (enemy.height * ENEMY_SCALE) / 2
    ) {
  
      enemy.setY((enemy.height * ENEMY_SCALE)/2); 
      enemy.setX(Math.floor(Math.random()*(SCREEN_WIDTH-enemy.width) + (enemy.width/2)));

      bullet.destroy()
  
    }


}
function spawnEnemy(engine) {
  if (enemy.y >= SCREEN_HEIGHT) {
    enemy.destroy();
    enemy = engine.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
    enemy.setX(Math.floor(Math.random()*(SCREEN_WIDTH-enemy.width) + (enemy.width/2)));
    enemy.setY((enemy.height * ENEMY_SCALE) / 2);
    enemy.setScale(ENEMY_SCALE);
  }
}

function spawnBullets(engine) {
  if (cursors.space.isDown && elapsedFrames > 20) {
    bullets.push(
      engine.add.ellipse(
        player.x,
        player.y - (player.height / 2) * PLAYER_SCALE,
        5,
        10,
        0xf5400a
      )
      
    );
 
    elapsedFrames = 0;
  }
}



function movePlayer() {
  if (cursors.left.isDown & (player.x > (player.width / 2) * PLAYER_SCALE)) {
    player.x -= PLAYER_VELOCITY;
  }

  if (
    cursors.right.isDown &
    (player.x < SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE)
  ) {
    player.x += PLAYER_VELOCITY;
  }
  if (cursors.up.isDown & (player.y > (player.height / 2) * PLAYER_SCALE)) {
    player.y -= PLAYER_VELOCITY;
  }
  if (
    cursors.down.isDown &
    (player.y < SCREEN_HEIGHT - (player.height / 2) * PLAYER_SCALE)
  ) {
    player.y += PLAYER_VELOCITY;
  }
}

function moveBackground() {
  background.setY(background.y + PLAYER_VELOCITY);
  background2.setY(background2.y + PLAYER_VELOCITY);

  if (background.y > SCREEN_HEIGHT / 2 + background.height) {
    background.setY(background2.y - background.height);
    const backgroundCopia = background;
    background = background2;
    background2 = backgroundCopia;
  }
}
