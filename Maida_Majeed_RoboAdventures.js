/*
<Robo Adventures>
 Maida Majeed
 Student No: 20885233
 
 INSTRUCTIONS
 To play the Robo Adventures, follow the following instructions:
 -Player Controls:
     - Use Up Arrow Key to Jump
     - Left Arrow Key to Move Left
     - Right Arrow Key Move Right
 -Jumping Suggestion:
     Try double jumping while pressing the arrow key for the direction you desire to move in. 
 -Cheat Code:
     - Press d to decrease the villain number by 1. You can continue to use the cheat code until 0 villains are left
     - When you initially run the game (beginning screen) or during level 1, you can press c to skip to Level 2
 -Goal: 
       Make your player, Robo, collect all the screws. Jump to different platforms to do so and avoid the villains, the aliens, by jumping over them. 
       For Level 2, remember to avoid the bad block as well. 
 -How the Game Runs:
       When the program runs initially, press the screen anywhere to begin Level 1 (or use a cheat code to skip to Level 2)
   - Level 1:
     - If you collect all 5 screws, you will be redirected to the Level 1 winning screen. 
       You can either press “r” to replay Level 1 or press “c” to continue to Level 2. The screen provides you with a warning for Level 2
     - If you lose 4 lives, you will be redirected to the Level 1 losing screen. 
       You can press “r” to replay. The screen reminds you that you can always use the cheat code to win!
   - Level 2:
     - If you collect all 5 screws, you will be redirected to the Level 2 winning screen. 
       You have the option to press “r” to replay Level 1 or to press “c” to replay Level 2.
     - If you lose 4 lives, you will be redirected to the Level 2 losing screen. 
       You can press “c” to replay. The screen reminds you that you can always use the cheat code to win and to avoid the bad block!
 
 CODING QUALITY AND VISUAL DESIGN
In Robo Adventures, through my coding quality and visual design, I gave my game character and made it seem like a professional game. 
Through visual design, I convey my game setting as outer space where the player, the robot, needs to avoid the enemies, the aliens, 
to collect all the screws. Furthermore, I initiate different stages at different times of the game. This is a part I am most proud of 
as I am allowing the player to go to various stages of the game while restricting when they are and are not allowed to do so. 
However, another part I am proud of but was stuck on for a long time was making my player jump and restricting it so it couldn’t 
jump from the bottom. As throughout the semester, we didn’t create something that would jump, I had to research a little and ended up 
introducing another variable along with speed (gravity). Also, I had to tweak the jump power several times to ensure it wouldn’t jump 
over the platform. Something I found really cool was the usage of maps to further enhance my visual design. As the player goes up, the 
sky gets brighter along with my mountains. However, a visual effect that I found difficult was to obtain a color scheme that fit my game 
character and seemed visually pleasing. To overcome this, I researched colour palletes. In conclusion, I believe my program is sophisticated 
due to the usage of user-defined functions to organize code, conditionals, and visual design that brings character. 
  Best Usage Identified throughout the code

 VIDEO
 https://youtu.be/i1fUifX7jrI
 
 RELEASE
 I Maida Majeed grant permission to CS 105 course staff to usemy Final Project program and video for the purpose of promoting CS 105.
 */

// player variable
let playerImage;
let playerX;
let playerY;
let playerWidth = 60;
let playerHeight = 70;
let playerJump = false;
let jumpCount = 0;
let playerGravity = 0.8;
let playerVelocity = 0;
let velChange = 11.5;
let minHeight = 580;
let maxHeight = -15;

// villain variable
let villainNum;
let villainX = [];
let villainY = [];
let villainWidth = 25;
let villainHeight = 35;
let villainSpeed;
let villainDirection = 1;

// bad block variable;
let badBlockX;
let badBlockY;
let badBlockWidth = 100;
let badBlockHeight = 100;
let badBlockDirection = 1;

// platform variable
let platformNum = 5;
let platformX = [];
let platformY = [];
let platformWidth = 250;
let platformHeight = 30;
let boxX = [];
let boxY = [];
let boxWidth = 250;
let boxHeight = 5;

// screw coin variable
let coinNum = 5;
let coinX = [];
let coinY = [];
let coinSize = 30;

// score and life
let score;
let lives;

// game levels
let stage = 0;
let mousePressAllowance = 0;

// beginning screen
let controlsImage;

function preload() {
  // player image
  playerImage = loadImage('data/Player.png');

  // how to play instruction
  controlsImage = loadImage('data/ArrowKeys.png');
}

function setup() {
  createCanvas(900, 700);
  textAlign(CENTER);
  initialization();
}

// calls levels and stages
function draw() {
  appearance();
  level();
}

// Best Usage: Mouse or Keyboard functions: The keyboard function to allow the player to go to different stages of the game
// game controls
function keyPressed() {

  // player jump
  if (keyCode === UP_ARROW) {
    if (jumpCount <= 1) {
      playerJump = true;
      jumpCount++;
      playerVelocity -= velChange;
    } else {
      playerVelocity += velChange;
    }

    // player moves left
  } else  if (keyCode === LEFT_ARROW) {
    playerX -= 43; 

    // player moves right
  } else if (keyCode === RIGHT_ARROW) {
    playerX += 43; 

    // restarts level 1
  } else if (key === 'r' && (stage === 2 || stage === 3 || stage === 5)) {
    initialization();
    stage = 1;

    // allows to restart level 2
  } else if (key === 'c' && (stage === 2 || stage === 5 || stage === 6)) {
    initialization();
    stage = 4;
    
    // allows to skip to level 2 
  } else if (key === 's' && (stage === 0 || stage === 1)) {
    initialization();
    stage = 4;
    
    // cheat code to decrease villain number
  } else if (key === 'd' && (stage === 1 || stage === 4)) {
    villainNum -= 1;
  }
}

// initially stars the game
function mousePressed() {
  if (mouseIsPressed === true && mousePressAllowance < 1 && stage === 0) {
    stage = 1;
    mousePressAllowance += 1;
  }
}

// initializes all variables
function initialization() {
  
  // player variables
  playerX = 420;
  playerY = 580;
  
  // villain variables
  villainNum = 5;
  villainSpeed = 1.2;
  
  // platform variables
  platformX = [60, 60, 325, 600, 600];
  platformY = [530, 190, 350, 190, 530];
  
  // scores and lives
  score = 0;
  lives = 4;
  
  // level 2 bad block villain 
  badBlockX = 400;
  badBlockY = 0;
  
  //Best Usage: Arrays: Creating platforms and olacing aliens and coins (on random positions) in reference to it
  for (let i = 0; i < platformNum; i++) {
    
    // villain variables
    villainX[i] = platformX[i];
    villainY[i] = platformY[i] - villainHeight;
    
    // platform variables
    boxX[i] = platformX[i];
    boxY[i] = platformY[i] + 25;
    
    // coin variables
    coinX[i] = random(platformX[i] + 25, platformX[i] + platformWidth - 25);
    coinY[i] = platformY[i] - 20;
  }
}

// draws player
function player() {
  // Best Usage: Loading and Displaying Images: The player
  image(playerImage, playerX, playerY, playerWidth, playerHeight);
  
   // Best Usage: Conditionals: To make the player jump on various platforms
  // jump attributes 
  if (playerY <= minHeight && playerJump === true) {
    playerY += playerVelocity;
    playerVelocity += playerGravity;
  } else {
    playerY = minHeight;
    playerVelocity = 0;
    jumpCount = 0;
  }
  if (playerY < maxHeight) {
    playerVelocity++;
  }

  // restrics player from leaving the canvas
  if (playerX + playerWidth >= width) {
    playerX -= 5;
  } else if (playerX <= 0) {
    playerX += 5;
  }
}

// villain for level 1 and 2
function villain() {
  noStroke();
  for (let i = 0; i < villainNum; i++) {
    
    // sppeed
    villainX[i] += (villainSpeed * villainDirection);

    // draws player
    fill(0, 230, 0);
    rect(villainX[i], villainY[i], villainWidth, villainHeight);
    fill('black');
    ellipse(villainX[i] + 12, villainY[i] + 12, 15, 15);
    rect(villainX[i] + 5, villainY[i] + 25, 15, 5);
    fill('red');
    ellipse(villainX[i] + 12, villainY[i] + 13, 5, 5);

    // changes villian direction if it hits platform edge
    if (villainX[i] <= platformX[i] + 5) {
      villainDirection += 1;
    } else if (villainX[i] + villainWidth >= platformX[i] + platformWidth - 5) {
      villainDirection -= 1;
    }
  }
}

// bad block villain for level 2
function badblock() {

  // speed
  badBlockY += (2 * badBlockDirection);

  // draws bad block
  // face
  noStroke();
  fill(80);
  rect(badBlockX, badBlockY, badBlockWidth, badBlockHeight);

  // eyes
  fill('red');
  ellipse(badBlockX + 50, badBlockY + 35, 35, 35);
  fill('black');
  ellipse(badBlockX + 50, badBlockY + 35, 20, 20);
  fill(80);
  ellipse(badBlockX + 50, badBlockY + 20, 35, 20);

  // cheeks
  fill(50);
  ellipse(badBlockX + 25, badBlockY + 57, 20, 10);
  ellipse(badBlockX + 75, badBlockY + 57, 20, 10);

  // mouth
  noStroke();
  fill('red');
  rect(badBlockX + 20, badBlockY + 70, 65, 10);

  // bad block direction
  if (badBlockY <= 0) {
    badBlockDirection = 1;
  } 
  if (badBlockY + badBlockHeight >= height - 50) {
    badBlockDirection -= 1;
  }
}

// draws platforms
function platforms() {
  for (let i = 0; i < platformNum; i++) {
    fill(150);
    noStroke();
    rect(platformX[i], platformY[i], platformWidth, platformHeight);
    fill(200);
    rect(boxX[i], boxY[i], boxWidth, boxHeight); // platform base
    fill(150);
    for ( let x = platformX[i] + 25; x < platformX[i] + platformWidth; x += 50) {
      ellipse(x, platformY[i], 25, 9);
    }
  }
}

// screw coins for points
function coins() {
  strokeWeight(3);
  stroke(50);
  fill(120);
  for (let i = 0; i < coinNum; i++) {
    ellipse(coinX[i], coinY[i], coinSize, coinSize);
    line(coinX[i] - 6, coinY[i] - 5, coinX[i] + 6, coinY[i] + 5 );
    line(coinX[i] + 6, coinY[i] - 5, coinX[i] - 6, coinY[i] + 5 );
  }
}

// lives for level 1 and 2
function life() {

  // text
  textSize(30);
  strokeWeight(2);
  stroke('#a01d2c');
  fill('#b22838');
  text('l i v e s : ' + lives, 270, 50);

  // lives restriction 
  if (lives === 0 && stage === 1) {
    stage = 3; // level 1 losing message
  } else if (lives === 0 && stage === 4) {
    stage = 6; // level 2 losing message
  }
}

// scores for level 1 and 2
function scores() {

  // text
  textSize(30);
  strokeWeight(2);
  stroke('#a01d2c');
  fill('#b22838');
  text('s c o r e : ' + score, 100, 50);

  // score restriction 
  if (score === coinNum && stage === 1) {
    stage = 2; // level 1 winning message
  } else if (score === coinNum && stage === 4) {
    stage = 5; // level 2 winning message
  }
}

// hit tests for level 1 & 2 
function hitTests() {
  for (let i = 0; i < platformNum; i++) {
    // Best Usage: Hit Test:  The two hit tests between the player and platform

    // to allow player to jump on the platform
    if (playerX + playerWidth - 5 > platformX[i] && playerX < platformX[i] + platformWidth && playerY + playerHeight > platformY[i] && playerY < platformY[i]) {
      playerY = platformY[i] - playerHeight;
      playerVelocity = 0;
      jumpCount = 0;

      // to restrict player from jumping when under the platform
    } else if (playerX + playerWidth > boxX[i] && playerX < boxX[i] + boxWidth && playerY > boxY[i] && playerY - playerHeight / 2 < boxY[i] + boxHeight && jumpCount === 1) {
      playerVelocity += velChange;
      jumpCount = 0;

      // hit test to gain points
    } else if (playerX + playerWidth >= coinX[i] - coinSize / 2 && playerX <= coinX[i] + coinSize / 2 && playerY <= coinY[i] - coinSize / 2 && playerY + playerHeight >= coinY[i] + coinSize / 2) {
      score += 1;
      coinX[i] += 1000;
    }
  }

  // hit test to lose lives
  for (let i = 0; i < villainNum; i++) {
    if (playerX + playerWidth > villainX[i] && playerX < villainX[i] + villainWidth - 5 && playerY + playerHeight > villainY[i] && playerY < villainY[i]) {
      lives -= 1;
      playerX = 420;
      playerY = 580;
    }
  }
}

// level two bad block hit test
function hitTestLevelTwo() {
  if (playerX + playerWidth > badBlockX && playerX < badBlockX + badBlockWidth && playerY > badBlockY && playerY < badBlockY + badBlockHeight) {
    lives -=1;
    playerX = 600;
    playerY = 580;
  }
}

//calls different stages of the game
function level() {

  // game introduction with instructions 
  if (stage === 0) {
    beginningMessage();

    // level 1
  } else if (stage === 1) {
    platforms();
    player();
    coins();
    villain();
    scores();
    life();
    hitTests();

    // winning message level one
  } else if (stage === 2) {
    winnerMessageLevelOne();

    // winning message level two
  } else if (stage === 3) {
    loserMessageLevelOne();

    // level 2
  } else if (stage === 4) {
    platforms();
    player();
    coins();
    villain();
    badblock();
    scores();
    life();
    hitTests();
    hitTestLevelTwo();

    // winning message level two
  } else if (stage === 5) {
    winnerMessageLevelTwo();

    // losing message level two
  } else if (stage === 6) {
    loserMessageLevelTwo();
  }
}

// winning message for level one
function winnerMessageLevelOne() {
  background('#9cbba5');

  // winning message
  textSize(90);
  strokeWeight(4);
  stroke('white');
  fill('red');
  text('Y O U  W I N !', width / 2, height / 2 - 100);

  // restart instruction
  textSize(25);
  noStroke();
  text('P r e s s   "r"   t o  R e s t a r t  L e v e l  1', width / 2, height / 2);
  text('o r  P r e s s   "c"   t o  C o n t i n u e  t o  L e v e l  2', width / 2, height / 2 + 50);

  // level 2 winning tip
  fill('#4e424a');
  text('L E V E L  2  T I P :', width / 2, height / 2 + 200);
  textSize(20);
  text('A v o i d  t h e  B a d  B l o c k ', width / 2, height / 2 + 230);
  text('U s e  t h e  C h e a t  C o d e  "d" ', width / 2, height / 2 + 250);
}

// winning message for level two
function winnerMessageLevelTwo() {

  // winning message
  background('#9cbba5');
  textSize(90);
  strokeWeight(4);
  stroke('white');
  fill('red');
  text('Y O U  W I N !', width / 2, height / 2 - 70);

  // instructions to restart level 1 and 2
  textSize(25);
  noStroke();
  text('P r e s s   "r"   t o  R e s t a r t  L e v e l  1', width / 2, height / 2 + 40);
  text('o r  P r e s s   "c"   t o  R e s t a r t  L e v e l  2', width / 2, height / 2 + 80);
}

// losing message for level one
function loserMessageLevelOne() {
  background('#4e424a');

  // losing message
  textSize(90);
  strokeWeight(4);
  stroke('white');
  fill('red');
  text('Y O U  L O S E !', width / 2, height / 2 - 100);

  // restart instruction
  textSize(25);
  noStroke();
  text('P r e s s   "r"   t o  R e s t a r t  L e v e l  1', width / 2, height / 2 + 20);

  // tip to win level 1
  fill('#e2be80');
  text('T I P :', width / 2, height / 2 + 150);
  textSize(20);
  text('d o u b l e   j u m p   t o   g o   a c r o s s   t h e   e n e m y ', width / 2, height / 2 + 175);
  text('u s e   c h e a t   c o d e    "d"    t o   d e c r e a s e   e n e m y   n u m b e r ', width / 2, height / 2 + 200);
}

// losing message for level two
function loserMessageLevelTwo() {
  background('#4e424a');

  // losing messaage
  textSize(90);
  strokeWeight(4);
  stroke('white');
  fill('red');
  text('Y O U  L O S E !', width / 2, height / 2 - 100);

  // restart instruction
  textSize(25);
  noStroke();
  text('P r e s s   "c"   t o  R e s t a r t  L e v e l  2', width / 2, height / 2 + 20);

  // tip to win level 2
  fill('#e2be80');
  text('T I P :', width / 2, height / 2 + 150);
  textSize(20);
  text('d o u b l e   j u m p   t o   g o   a c r o s s   t h e   e n e m y ', width / 2, height / 2 + 175);
  text('u s e   c h e a t   c o d e    "d"    t o   d e c r e a s e   e n e m y   n u m b e r ', width / 2, height / 2 + 200);
  text('a v o i d  t h e  b a d  b l o c k', width / 2, height / 2 + 225);
}

// game introduction with instructions
function beginningMessage() {
  textSize(60);
  strokeWeight(4);
  stroke('white');
  fill('red');

  // game introduction
  text('R O B O   A D V E N T U R E S', width / 2, 150);
  textSize(30);
  strokeWeight(1.5);
  text('b y   m a i d a   m a j e e d', width / 2, 200);

  // type writing effect
  textSize(35);
  noStroke();
  text('|', width / 2 + 140, 272);

  // how to play manual and intruction to start
  textSize(35);
  fill('white');
  text('H o w  t o  P l a y', width / 2, 270);

  // instructions image
  image(controlsImage, width / 2 - 145, 250, 300, 280);

  textSize(30);
  text('P r e s s   t h e   S c r e e n   t o   S t a r t', width / 2, 520);

  // cheat code
  textSize(18);
  text(' !! C H E A T  C O D E !!', width / 2, 575);
  textSize(16);
  text('P r e s s   "d"   t o  D e c r e a s e  E n e m y  N u m b e r', width / 2, 600);
  text('P r e s s   "s"   t o  s k i p  t o  L e v e l  2  R i g h t  N o w  o r  D u r i n g  L e v e l  1', width / 2, 625);
}

// Best Usage: Drawing Shapes and Using Attributes for background design 
function appearance() {
  
  // Best Usage: Remapping With Map: creating a day and night effect in the background within the sky and mountains
  // canvas background
  let r = map(playerY, 0, height, 80, 10);
  let g = map(playerY, 0, height, 80, 10);
  let b = map(playerY, 0, height, 120, 20);
  background(r, g, b);
  noStroke();
  
  // mountain in the back
  let mountainOneRed = map(playerY, 0, height, 70, 0);
  let mountainOneGreen = map(playerY, 0, height, 70, 0);
  let mountainOneBlue = map(playerY, 0, height, 120, 20);
  fill(mountainOneRed, mountainOneGreen, mountainOneBlue);
  bezier(0, 650, 375, 616, 520, 6, 1015, 650);

  // mountain in the front
  let mountainTwoRed = map(playerY, 0, height, 90, 10);
  let mountainTwoGreen = map(playerY, 0, height, 90, 10);
  let mountainTwoBlue = map(playerY, 0, height, 150, 40);
  fill(mountainTwoRed, mountainTwoGreen, mountainTwoBlue);
  bezier(-100, 650, 404, 100, 615, 618, 900, 650);

  // ground
  fill('grey');
  noStroke();
  rect(0, height - 50, width, 50);
  for ( let x = 25; x < width; x += 50) {
    ellipse(x, 650, 30, 10);
  }


  // purple planet
  fill(120, 95, 120);
  ellipse(670, 200, 320, 320);
  noFill();
  strokeWeight(20);
  stroke(150, 105, 150);
  bezier(822, 130, 1150, 70, 250, 450, 518, 270);

  // grey planet
  stroke(80, 100, 100, 100);
  fill(190, 200, 200);
  ellipse(350, 150, 150, 150);

  // green planet 
  stroke(80, 100, 100, 100);
  fill(140, 150, 110);
  ellipse(150, 80, 100, 100);
}
