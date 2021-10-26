let hueValue = 180;
let saturationValue;
let lightnessValue;
let newColor;
let mouseX;
let mouseY;
let chanel = document.querySelector('.chanel');
let circleColor = 180;

Draggable.create(".circle", {
    type:"x",
    bounds: document.querySelector(".chanel"),
    throwProps:true,
    onDrag:function() {
      hueValue = Math.round(gsap.utils.mapRange(this.minX, this.maxX, 0, 359, this.x));
    },
  });

  let clickHue = (event) => {
    let width = chanel.getBoundingClientRect().width;
    let newX = event.clientX - chanel.getBoundingClientRect().left;

    hueValue = Math.round(gsap.utils.mapRange(0, width, 0, 359, newX));
    
    let circleX = Math.round(gsap.utils.mapRange(0, width, - width/2, width/2, newX))
    gsap.to('.circle', {x: circleX, ease: Power2.easeInOut})
    updateValues();
  }

chanel.addEventListener("click", clickHue)

function updateDisplay(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  updateValues();
}

document.addEventListener("mousemove", updateDisplay, false);

let updateValues = () => {
  saturationValue = Math.round(gsap.utils.mapRange(0, innerWidth, 0, 100, mouseX));
  lightnessValue = Math.round(gsap.utils.mapRange(0, innerHeight, 100, 0, mouseY));

  newColor = 'hsl(' + hueValue + ',' + saturationValue + '%,' + lightnessValue + '%)';
  circleColor = 'hsl(' + hueValue + ',75%,75%)';
  gsap.to('body', {'backgroundColor': newColor});
  gsap.to('.circle', {'backgroundColor': newColor});
  gsap.to('.chanel', {'backgroundColor': newColor})
}