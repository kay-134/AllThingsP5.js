/*
Serial Library:
https://github.com/yoonbuck/p5.WebSerial/wiki/Guide

Serial handshaking and multi-value strings using p5.webserial. Sends an 'x' out the serial port on port opening, then waits for serial to come in. Expects a Comma Separated Value string. Separates it into three parts, then sends an 'x' to request another string from the sender.
created 31 May 2022
modified 11 Jun 2022
by Tom Igoe
modified 09 Oct 2022
by David Rios
modified 16 Oct 2022
by Kayley Chery
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
// HTML button object:
let portButton;
let inData; // for incoming serial data
let outData; // for outgoing data

// variables for the circle to be drawn:
// let ballx = 50; 
// let bally = 50;

//ball variable //JSON 


let pidgeon = {
    x: 150,
    y: 150,
    spX: 5,
    size: 50,
  };

//variable for background to change


let angle = 0;

let centerX, centerY;

let br = 0;
let bg = 0;
let bb = 0;

function setup() {
  createCanvas(windowWidth,windowHeight); // make the canvas
  
  br = random(255);
  bg = random(255);
  bb = random(255);
  
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  textSize(40);
 
  centerX = width / 2;
  centerY = height / 2;
  
}

////////////
// DRAW  ///
////////////
function draw() {
 
background(173,216,230); // sky
  
  
  let distance = dist(centerX, centerY, mouseX, mouseY)
   
  angle = int(map(mouseY, 0,height,255,0));
  
  fill(255,0,0)
  text("pigeon x: " + pidgeon.x, 10, 100);
  text("pigeon y: " + pidgeon.y, 10,150);
  
 drawKayley(); 
 drawPidgeon();
 
}

function drawPidgeon(){
  noStroke();
  //wing slightly hiding
  fill(100,100,100);
  triangle(pidgeon.x-20, pidgeon.y+80, pidgeon.x-20, pidgeon.y+15, pidgeon.x-70, pidgeon.y+110 );
  
  //head
  fill(192,192,192);
  circle(pidgeon.x, pidgeon.y, pidgeon.size);
  
  //body
  ellipse(pidgeon.x-45, pidgeon.y+50, pidgeon.size+100, pidgeon.size+30);
  
  //wing not hiding
  fill(100,100,100);
  triangle(pidgeon.x-50, pidgeon.y+80, pidgeon.x-50, pidgeon.y+15, pidgeon.x-100, pidgeon.y+110 );
  
  //beak
  triangle(pidgeon.x+25, pidgeon.y-5, pidgeon.x+50, pidgeon.y+15, pidgeon.x+20, pidgeon.y+17 );
  
  //eye
  fill(0,0,0);
  circle(pidgeon.x, pidgeon.y, pidgeon.size-40);
  
}

function drawKayley(){
  noStroke();
  //hair color changes depending on the x-axis of the mouse
  let hairColor = map(mouseX, 0, width, 0, 255);
  

  
  //hair
  fill(hairColor, 0, 0);
  diameter = 1366/10;
  
  circle(1366*5.5/12, 200, diameter);
  circle(1366*6.5/12, 200, diameter);
  circle(1366*4.6/12, 250, diameter);
  circle(1366*7.4/12, 250, diameter);
  circle(1366*4/12, 350, diameter);
  circle(1366*8/12, 350, diameter);
  circle(1366*4/12, 350, diameter);
  circle(1366*8/12, 350, diameter);
  circle(1366*4/12, 450, diameter);
  circle(1366*8/12, 450, diameter);
  circle(1366*4/12, 550, diameter);
  circle(1366*8/12, 550, diameter);
  circle(1366*4/12, 650, diameter);
  circle(1366*8/12, 650, diameter);
  circle(1366*4/12, 750, diameter);
  circle(1366*8/12, 750, diameter);
  rect(500, 364, 430, 550);
  
  widthMouth = 1366/20;
  heightMouth = 1366/35;
  
  
  circle(1366/2, 768/2, 400);
  widthHead = 1366/5;
  heightHead = 1366/4;
  
  
  //Head 
  
  fill(198,136,99)
  ellipse(1366/2, 768/2, widthHead, heightHead);
  
  widthEar = 1366/19;
  heightEar = 1366/16;
  
  //Left Ear 
  ellipse(1366*4.8/12,768/2,widthEar, heightEar);
  
  //Right Ear
  ellipse(1366*7.2/12,768/2,widthEar, heightEar);
  
  // (176, 108, 73)
  
  //Bangs
  fill(hairColor, 0, 0);
  ellipse(600, 260, 200, 80);
  ellipse(766, 260, 200, 80);
  ellipse(638, 215, 200, 90);
  
  //Nose
  
  widthNose = windowWidth/23;
  heightNose = windowWidth/30;
  
  
  fill(176, 108, 73)
  ellipse(1366/2, (768+50)/2, 1366/28, 1366/45);
  
  //Mouth
  widthMouth = 1366/20;
  heightMouth = 1366/25;
  
  
  fill(116, 61, 43)
  ellipse(1366/2, (768+190)/2, widthMouth, heightMouth);
  
  fill(198,136,99)
  rect((1366-65)/2, (768+130)/2, widthMouth, 20);
  
  //ellipse(x, y, w, [h])
  
  //tounge
  widthMouth = 1366/20;
  heightMouth = 1366/35;
  
  
  fill(209,144,142)
  ellipse(1366/2, (768+220)/2, widthMouth/2, heightMouth/2);
  
  //eyes
  fill(0, 0, 0);
  diameter = 1366/60;
  
  //Left Eye 
  circle(1366*5.4/12, 350, diameter);
  //Right Eye
  circle(1366*6.6/12, 350, diameter);
  
  //body
  fill(152,115,172);
  rect(560, 575, 250, 200, 40);
  
  //neck
  fill(198,136,99)
 
  rect(640, 510, 80, 130, 40);
  
  fill(br,bg,bb);
  //Left Earrings 
  circle(1366*4.73/12, 410, 1366/150);
  circle(1366*4.6/12, 400, 1366/170);
  //Right Earrings 
  circle(1366*7.27/12, 410, 1366/150);
  circle(1366*7.4/12, 400, 1366/170);
  
}
/////////////////////////////
// SEND AND RECEIVE DATA  ///
/////////////////////////////

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil("\r\n");
  //check to see that there's actually a string there:  
  
  if (inString){ 
    //console.log(inString)
    
    
    let sensors = split(inString, ",");
    
   // console.log(sensors)
    
    ball.x =  int(map(sensors[0], 0, 1023,0, width) ) ;
    ball.y = int (map(sensors[1], 0,1023, 0,height ) );
    
    pidgeon.x =  int(map(sensors[0], 0, 1023,0, width) ) ;
    pidgeon.y = int (map(sensors[1], 0,1023, 0,height ) );
    
    //serial.write("x");
    serial.write(angle);
  }
}


/////////////////////////////////////////////
// UTILITY FUNCTIONS TO MAKE CONNECTIONS  ///
/////////////////////////////////////////////

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
    serial.write("x");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

