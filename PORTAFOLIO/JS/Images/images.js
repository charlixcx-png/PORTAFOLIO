var myGamePiece;

// Canvas and game initialization
function startGame() {
  myGamePiece = new component(30, 30, "smiley.gif", 10, 120, "angry.gif");
  myGameArea.start();
}

// Definition of the myGameArea object
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// Definition of the component object
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  
  // Control bouncing at the edges
  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce back if the image hits the edges horizontally
    if (this.x > canvasWidth - this.width) {
      this.x = canvasWidth - this.width;
      this.speedX = -this.speedX;
    }
    if (this.x < 0) {
      this.x = 0;
      this.speedX = -this.speedX;
    }

    // Bounce back if the image hits the edges vertically
    if (this.y > canvasHeight - this.height) {
      this.y = canvasHeight - this.height;
      this.speedY = -this.speedY;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY = -this.speedY;
    }
  };
}

// Global function to update the game area
function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos(myGameArea.canvas.width, myGameArea.canvas.height);
  myGamePiece.update();
}

// Methods that control the movement of the object
function moveup() {
  myGamePiece.speedY = -1;
}

function movedown() {
  myGamePiece.speedY = 1; // Mueve hacia abajo
}

function moveleft() {
  myGamePiece.speedX = -1; // Mueve hacia la izquierda
}

function moveright() {
  myGamePiece.speedX = 1;  // Mueve hacia la derecha
}

// Stop movement when no button is pressed
function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
