"use strict";

var hueValue = 180;
var saturationValue;
var lightnessValue;
var newColor;
var mouseX;
var mouseY;
var chanel = document.querySelector('.chanel');
var circleColor = 180;
var swipeBarBox = document.querySelector('.swipe-bar-box');
var tl_intro;
var tl_interacted;
var canInteract;
var skipButton = document.querySelector('.skip-button'); //hue bar initial visibility

gsap.set(swipeBarBox, {
  visibility: 'hidden'
}); //Draggable

Draggable.create(".circle", {
  type: "x",
  bounds: document.querySelector(".chanel"),
  throwProps: true,
  onDrag: function onDrag() {
    hueValue = Math.round(gsap.utils.mapRange(this.minX, this.maxX, 0, 359, this.x));
  }
}); //modify the hue bar without dragging

var clickHue = function clickHue(event) {
  var width = chanel.getBoundingClientRect().width;
  var newX = event.clientX - chanel.getBoundingClientRect().left;
  hueValue = Math.round(gsap.utils.mapRange(0, width, 0, 359, newX));
  var circleX = Math.round(gsap.utils.mapRange(0, width, -width / 2, width / 2, newX));
  gsap.to('.circle', {
    x: circleX,
    ease: Power2.easeInOut
  });
  updateValues();
};

chanel.addEventListener("click", clickHue); //updates mouse position

function updateDisplay(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  updateValues();
}

document.addEventListener("mousemove", updateDisplay, false); //updates all values

var updateValues = function updateValues() {
  saturationValue = Math.round(gsap.utils.mapRange(0, innerWidth, 0, 100, mouseX));
  lightnessValue = Math.round(gsap.utils.mapRange(0, innerHeight, 100, 0, mouseY));
  newColor = 'hsl(' + hueValue + ',' + saturationValue + '%,' + lightnessValue + '%)';
  circleColor = 'hsl(' + hueValue + ',75%,75%)';
  gsap.to('body', {
    'backgroundColor': newColor
  });
  gsap.to('.circle', {
    'backgroundColor': newColor
  });
  gsap.to('.chanel', {
    'backgroundColor': newColor
  });
}; //hue visibility


var hueBarVisibility = function hueBarVisibility() {
  var opacityBar = swipeBarBox.style.visibility; //console.log(opacityBar)

  if (opacityBar == 'visible') {
    gsap.to(swipeBarBox, {
      duration: 0.6,
      opacity: 0,
      onComplete: function onComplete() {
        gsap.set(swipeBarBox, {
          visibility: 'hidden',
          ease: Power4.easeOut
        });
      }
    });
  } else {
    gsap.fromTo(swipeBarBox, {
      visibility: 'visible',
      opacity: 0
    }, {
      duration: 0.6,
      opacity: 1,
      ease: Power4.easeOut
    });
  }

  console.log(canInteract);
}; //press spacebar


document.addEventListener('keydown', function (event) {
  var keyName = event.code;
  console.log('presiono spacebar', canInteract);

  if (keyName === 'Space' && canInteract) {
    hueBarVisibility();
    tl_interacted.play();
  }
}); //skip button

skipButton.addEventListener('click', function () {
  tl_intro.pause();
  tl_interacted.pause();
  gsap.to('.intro', {
    duration: 0.5,
    autoAlpha: 0
  });
  canInteract = true;
  console.log(canInteract);
}); //open video

document.addEventListener('click', function () {
  console.log(hueValue, saturationValue, lightnessValue, canInteract);

  if (hueValue > 160 && hueValue < 190 && saturationValue > 40 && saturationValue < 60 && lightnessValue > 30 && lightnessValue < 50 && canInteract == true) {
    window.open('https://www.youtube.com/watch?v=6Jn0Snx6yVA', '_blank');
  }
}); //intro animation

var introTl = function introTl() {
  console.log('inicia tl');
  canInteract = false;
  tl_intro = gsap.timeline();
  tl_intro.from('#step1', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }).to('#step1', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }, 4).to('.arrow-up', {
    duration: 0.7,
    y: '-50px',
    repeat: '-1',
    ease: Power3.easeOut,
    yoyo: true
  }, 4).to('.arrow-down', {
    duration: 0.7,
    y: '50px',
    repeat: '-1',
    ease: Power3.easeOut,
    yoyo: true
  }, 4).from('#step2', {
    duration: 1.5,
    opacity: 0,
    y: 500,
    ease: Power4.easeOut
  }).to('.arrow-left', {
    duration: 0.7,
    x: '-50px',
    repeat: '-1',
    ease: Power3.easeOut,
    yoyo: true
  }, 5).to('.arrow-right', {
    duration: 0.7,
    x: '50px',
    repeat: '-1',
    ease: Power3.easeOut,
    yoyo: true
  }, 5).to('#step2', {
    duration: 1.5,
    opacity: 0,
    y: -500,
    ease: Power4.easeOut
  }, '+=5').from('#step3', {
    duration: 1.5,
    opacity: 0,
    y: 500,
    ease: Power4.easeOut
  }).to('#step3', {
    duration: 1.5,
    opacity: 0,
    y: -500,
    ease: Power4.easeOut
  }, '+=5').fromTo('.spacebar', {
    width: '75%'
  }, {
    duration: 0.7,
    width: '100%',
    height: 'auto',
    repeat: '-1',
    ease: Power3.easeOut,
    yoyo: true
  }).from('#step4', {
    duration: 1.5,
    opacity: 0,
    y: 500,
    ease: Power4.easeOut,
    onComplete: function onComplete() {
      canInteract = true;
    }
  });
  tl_interacted = gsap.timeline({
    paused: true
  });
  tl_interacted.to('#step4', {
    duration: 1.5,
    opacity: 0,
    y: -500,
    ease: Power4.easeOut
  }, 0).from('#step5', {
    duration: 1.5,
    opacity: 0,
    y: 500,
    ease: Power4.easeOut
  }).to('#step5', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut,
    onComplete: function onComplete() {
      canInteract = false;
    }
  }, '+=5').to(swipeBarBox, {
    duration: 1.5,
    visibility: 'hidden',
    ease: Power4.easeOut
  }, '-=1').from('#step6', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }).to('#step6', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }, '+=3').from('#step7', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }).to('#step7', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }, '+=5').from('#step8', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut
  }).to('.intro', {
    duration: 1.5,
    opacity: 0,
    ease: Power4.easeOut,
    onComplete: function onComplete() {
      gsap.set(swipeBarBox, {
        visibility: 'hidden'
      });
      canInteract = true;
    }
  }, '+=3');
};

introTl();