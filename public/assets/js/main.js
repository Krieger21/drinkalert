
class bubble {
    constructor(canvasWidth, canvasHeight) {
        this.maxHeight = canvasHeight; 
        this.maxWidth = canvasWidth; 
        this.randomise();
    }
    generateDecimalBetween(min, max) {
        return (Math.random() * (min - max) + max).toFixed(2);
    }
    update() {
        this.posX = this.posX - this.movementX; 
        this.posY = this.posY - this.movementY;
        
        if(this.posY < 0 || this.posX < 0 || this.posX > this.maxWidth) {
            this.randomise();
            this.posY = this.maxHeight;
        }
    }
    randomise() {
        this.colour = 255;
        // this.colour = Math.random() * 255;
        this.size = this.generateDecimalBetween(15, 50);
        this.movementX = this.generateDecimalBetween(-0.4, 0.4); 
        this.movementY = this.generateDecimalBetween(0.7, 2); 
        this.posX = this.generateDecimalBetween(0,this.maxHeight); 
    }
}

class background {
    constructor() {
        this.canvas = document.getElementById("floatingbubbles");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth; 
        this.bubblesList = [];
        this.generateBubbles();
        this.animate();
    }
    animate() {
        let self = this;
        self.ctx.clearRect(0,0, self.canvas.width, self.canvas.height);
        self.bubblesList.forEach(function(bubble) {
            bubble.update();
            self.ctx.beginPath();
            self.ctx.arc(bubble.posX, bubble.posY, bubble.size, 0, 2 * Math.PI);
            self.ctx.fillStyle = "rgba(" + bubble.colour + ", 255, 255, 0.5)";
            self.ctx.fill();
            self.ctx.strokeStyle = "hsl(" + bubble.colour + ", 40%, 39%)";
            self.ctx.stroke();
        });
        requestAnimationFrame(this.animate.bind(this));
    }
    addBubble(bubble) {
        return this.bubblesList.push(bubble); 
    }
    generateBubbles() {
        let self = this; 
        for (let i = 0; i < self.bubbleDensity(); i++) {
            self.addBubble(new bubble(self.canvas.width, self.canvas.height));
        }
    }
    bubbleDensity() {
        return Math.sqrt((this.canvas.height, this.canvas.width) * 5);
    }
}
window.onload = function() {
    new background();
    console.log("fomo");
  };
  
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();


  var introBurb = new Audio ("assets/audio/introBurp.mp3");
var buttonBurp = new Audio ("assets/audio/buttonBurp.mp3");


setTimeout(oneSecond, 1000); 

function oneSecond() {
    // $('#intro-burp').append();
    console.log("burp greeting");
    introBurb.play();
}

$("#beerButton").click(function() {
    buttonBurp.play();
    setTimeout(function() { window.location = '/signin' }, 1000);
    
    console.log("loadme")
});

