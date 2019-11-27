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
  angleMode(DEGREES);

  analyzer = new p5.Amplitude();
  analyzer.setInput(themeSong);

  fft = new p5.FFT(0.7, 512);
  fft.setInput(themeSong);

  showReplayButton();
}

function draw() {
  background(3, 37, 108);
  
  tg1Logo();

  // highMid visualizer
  energyVisualizer(width / 10, "treble");

  // highMid visualizer
  energyVisualizer(width / 8, "highMid");

  // highMid visualizer
  energyVisualizer(width / 6, "lowMid");

  // bass visualizer
  energyVisualizer(width / 4, "bass");

  //showReplayButton();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function tg1Logo() {
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, width / 4);

  let logoWidth = logo.width / 12 + (volume * 2);
  let logoHeight = logo.height / 12  + (volume * 2);

  //console.log("var volume:" + volume);

  image(logo, windowWidth / 3, windowHeight / 2, logoWidth, logoHeight);
}

function showReplayButton() {
  if (themeSong.isPlaying() == false) {
    replayButton();
  }
}

function replayButton() {
  let playButton = createButton('Replay TG1 theme');
  playButton.position((windowWidth / 3) - 90, windowHeight - 60);
  playButton.addClass("button");
  playButton.mousePressed(playTheme);
}

function playTheme() {
  if (themeSong.isPlaying() == false) {
    themeSong.play();
    newCanvas.mouseMoved(false);
  } 
}

function energyVisualizer(_radius, _energy) {
  this.radius = _radius;
  this.energy = _energy;
  
  let spectrum = fft.analyze();
  const energy = fft.getEnergy(this.energy);
  map(energy, 0, 255, 0, 360);

  //console.log(energyBass);

  push();
  translate(width / 3, height / 2);
  rotate(energy);
  strokeCap(SQUARE);
  strokeWeight(2);
  noFill();
  stroke(255, 233, 92);

  arc(0, 0, radius + energy, radius + energy, 0, 350);
  pop();
}