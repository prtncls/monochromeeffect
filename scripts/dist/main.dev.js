"use strict";

var hueValue = 180;
var saturationValue;
var lightnessValue;
var newColor;
var mouseX;
var mouseY;
var chanel = document.querySelector('.chanel');
var circleColor = 180;
Draggable.create(".circle", {
  type: "x",
  bounds: document.querySelector(".chanel"),
  throwProps: true,
  onDrag: function onDrag() {
    hueValue = Math.round(gsap.utils.mapRange(this.minX, this.maxX, 0, 359, this.x));
  }
});

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

chanel.addEventListener("click", clickHue);

function updateDisplay(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  updateValues();
}

document.addEventListener("mousemove", updateDisplay, false);

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
};