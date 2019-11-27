let newCanvas;
let themeSong;
let logo;
let volume = 0;
let analyzer;

function preload() {
  themeSong = loadSound("./assets/TG1_new.mp3");
  logo = loadImage("./assets/TG1.png");
}

function setup() {
  newCanvas = createCanvas(windowWidth, windowHeight);
  newCanvas.mouseMoved(playTheme);

  rectMode(CENTER);
  imageMode(CENTER);

  analyzer = new p5.Amplitude();
  analyzer.setInput(themeSong);

  showReplayButton();
}

function draw() {
  background(3, 37, 108);
  
  tg1Logo();

  //showReplayButton();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playTheme() {
  if (themeSong.isPlaying() == false) {
    themeSong.play();
    newCanvas.mouseMoved(false);
  } 
}

function tg1Logo() {
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, width / 2);

  //console.log("var volume:" + volume);

  fill(255, 233, 92);
  noStroke();
  image(logo, windowWidth / 4, windowHeight / 2, logo.width / 10 + volume, logo.height / 10 + volume);
}

function showReplayButton() {
  if (themeSong.isPlaying() == false) {
    replayButton();
  }
}

function replayButton() {
  let playButton = createButton('Replay TG1 theme');
  playButton.position(windowWidth / 4, (windowHeight / 4) * 3);
  playButton.addClass("button");
  playButton.mousePressed(playTheme);
}
