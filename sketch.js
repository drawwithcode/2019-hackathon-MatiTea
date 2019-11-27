let newCanvas;
let themeSong;

function preload() {
  themeSong = loadSound('./assets/TG1_new.mp3');
}

function setup() {
  newCanvas = createCanvas(windowWidth, windowHeight);
  newCanvas.mouseMoved(playTheme);

  rectMode(CENTER);

  analyzer = new p5.Amplitude();
  analyzer.setInput(themeSong);
}

function draw() {
  background(3, 37, 108);
  
  tg1Logo();

  showReplayButton();
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
  let volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 50, 255);

  fill(52, 64, 100);
  noStroke();
  rect(windowWidth / 4, windowHeight / 2, 50, 50);
}

function showReplayButton() {
  if (newCanvas.mouseMoved(false)) {
    replayButton();
  }
}

function replayButton() {
  let playButton = createButton('Replay TG1 theme');
  playButton.position(windowWidth / 4, (windowHeight / 4) * 3);
  playButton.mousePressed(playTheme);
}
