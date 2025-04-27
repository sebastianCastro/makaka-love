document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'js-close-modal'
    const closeButtons = document.querySelectorAll('.js-close-modal');
    
    // Update the close button event listener in script.js
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from reaching the Paper's mousedown
            const browserWindow = button.closest('.paper'); // Remove the .paper element
            if (browserWindow) {
                browserWindow.remove();
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('music');
    const playButton = document.getElementById('play-button'); // Add an ID to your play button or element

    // Flag to track if the audio has been interacted with
    let hasInteracted = false;

    // Add a click event listener to the play button
    if (playButton) {
        playButton.addEventListener('click', function () {
            if (!hasInteracted) {
                // Play the audio and unmute it
                audio.muted = false;
                audio.play();
                hasInteracted = true; // Set the flag to true after the first interaction
            }
        });
    }
});


let highestZ = 1;
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if(!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }
      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    })
    paper.addEventListener('mousedown', (e) => {
      if(this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      if(e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});