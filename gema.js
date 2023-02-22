function GemamoveSlide(el, next){
  let slides = document.getElementsByClassName(el + '-element');
  // Número de elementos del slider
  let numberOfSlides = slides.length;
  // Tamaño de un solo elemento
  let oneElementSize = slides[0].offsetWidth;
  let container = document.getElementById(el);
  // Calcula cuántos elementos son visibles
  let visibleSlides = Math.round(container.parentElement.offsetWidth / oneElementSize);
  let position = parseInt(container.getAttribute('data-position'));
  let num;
  if(next){
    // Valida si es la última posición
    if(position >= Math.ceil(numberOfSlides / visibleSlides)){
      num = 1;
    } else {
      num = position + 1;
    }
  } else {
    // Valida si es laprimera posición
    if(position <= 1){
      num = Math.ceil(numberOfSlides / visibleSlides);
    } else {
      num = position - 1;
    }
  }
  GemagotoSlide(el, num);
};

function GemagotoSlide(el, num){
  let slides = document.getElementsByClassName(el + '-element');
  // Número de elementos del slider
  let numberOfSlides = slides.length;
  // Tamaño de un solo elemento
  let oneElementSize = slides[0].offsetWidth;
  let container = document.getElementById(el);
  // Calcula cuántos elementos son visibles
  let visibleSlides = Math.round(container.parentElement.offsetWidth / oneElementSize);
  let oneElementPercentage = 100/numberOfSlides;
  let percentageToMove = 0;
  let toSubstract = 0;
  // Si es la última posición, valida que no queden espacios vacíos
  if((num * visibleSlides) > numberOfSlides){
    toSubstract = ((num * visibleSlides) - numberOfSlides) * oneElementPercentage;
  }
  percentageToMove = ((num - 1) * (visibleSlides * oneElementPercentage)) - toSubstract;
  container.setAttribute('data-position', num);
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
};

// Función para abrir elementos
// Primer parámetro: id del elemento al que le agregará la clase 'opened'
// Segundo parámetro (opcional): clase de los elementos a los que les quitará la clase 'opened'
function Gemaopen(el, cl){
  let element = document.getElementById(el);
  if(cl){
    let sameClass = document.getElementsByClassName(cl);
    for(i = 0; i < sameClass.length; i++){
      if(sameClass[i] != element){
        sameClass[i].classList.remove('opened');
      }
    }
  }
  element.classList.toggle('opened');
  document.activeElement.blur();
  setTimeout(() => Gemascroll(el), 200);
}

// Función para hacer scroll hasta un elemento
// Recibe como parámetro el id del elemento
function Gemascroll(el){
  let Gemaelement_scroll = document.getElementById(el);
  let GemascrollingObject = {
    top: (Gemaelement_scroll.getBoundingClientRect().top - (window.innerHeight / 3)),
    left: 0,
    behavior: 'smooth'
  }
  window.scrollBy(GemascrollingObject);
}

function validateTarget(fun, par){
  if(event.target == event.currentTarget){
    fun(par);
  }
}

// Validación de Sticky Elements

let stickyElements = document.getElementsByClassName('stickyElement');
let prevElement = 0;
let actualElement = 1;
let nextElement = 2;
let halfHeightScreen = (window.screen.height / 5) * 3;

function GemaValidateSticky(){
  let isLastElement;
  if(nextElement > stickyElements.length){
    isLastElement = true;
  } else {
    isLastElement = false;
  }
  if (!isLastElement && (stickyElements[nextElement - 1].nextElementSibling.getBoundingClientRect().top - halfHeightScreen) <= 0){
    prevElement = actualElement;
    actualElement = nextElement;
    nextElement = actualElement + 1;
  }
  if (prevElement != 0 && (stickyElements[actualElement - 1].nextElementSibling.getBoundingClientRect().top - halfHeightScreen) > 0){
    nextElement = actualElement;
    actualElement = prevElement;
    prevElement = prevElement - 1;
  }
  if (prevElement == 0 && (stickyElements[actualElement - 1].nextElementSibling.getBoundingClientRect().top - (window.screen.height / 3)) > 0){
    if(!isLastElement){
      stickyElements[nextElement - 1].classList.remove('showed');
    }
    stickyElements[actualElement - 1].classList.remove('showed');
  } else if ((stickyElements[actualElement - 1].nextElementSibling.getBoundingClientRect().top - halfHeightScreen) < 0){
    if(prevElement > 0){
      stickyElements[prevElement - 1].classList.remove('showed');
    }
    if(!isLastElement){
      stickyElements[nextElement - 1].classList.remove('showed');
    }
    stickyElements[actualElement - 1].classList.add('showed');
  }
}

function copyToClipboard (jsUrl, str){
  let url;
  if(jsUrl){
    url = window.location.href;
  } else {
    url = str;
  }
  let el = document.createElement('textarea');
  el.value = url;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('URL copiada en el portapapeles');
};

// Bot especial migrantes

let MigrantesBot = document.getElementById('MigrantesBot');

// if(MigrantesBot){
//   MigrantesBot.classList.remove('hidden');
//   MigrantesBot.href = "https://google.com";
// }

// Validación de Parallax

let parallax = document.getElementsByClassName('GemaParallaxElement');
let parallaxCount = [];
let prevParallaxElement = -1;
let nextParallaxElement = 0;
let inReverse = false;

if(parallax.length > 0){
  for(let i = 0; i < parallax.length; i++){
    parallax[i].addEventListener('click', () => GemaNext2Parallax(i));
  }
}


// function GemaNextParallax(){
//   let el = parallax[nextParallaxElement];
//   let items = el.getElementsByClassName('GemaParallaxItem')
//   let numberOfItems = items.length;
//   if (parallaxCount[nextParallaxElement] < numberOfItems){
//     items[parallaxCount[nextParallaxElement] - 1].classList.remove('visible');
//     if(el.classList.contains('zoom')){
//       el.classList.remove(`position${parallaxCount[nextParallaxElement]}`)
//       parallaxCount[nextParallaxElement]++;
//       el.classList.add(`position${parallaxCount[nextParallaxElement]}`)
//     } else {
//       parallaxCount[nextParallaxElement]++;
//     }
//     items[parallaxCount[nextParallaxElement] - 1].classList.add('visible');
//   } else if(parallaxCount[nextParallaxElement] >= numberOfItems){
//     unactivateElement(parallax[nextParallaxElement]);
//     prevParallaxElement = nextParallaxElement;
//     enableScroll();
//     document.documentElement.style.scrollBehavior = '';
//     scrollDisabled = false;
//     parallax[nextParallaxElement].removeEventListener('click', GemaNextParallax);
//     parallax[nextParallaxElement].addEventListener('click', () => GemaNext2Parallax(prevParallaxElement));
//     if(nextParallaxElement < parallax.length - 1){
//       nextParallaxElement = nextParallaxElement + 1;
//     } else {
//       nextParallaxElement = null;
//     }
//   } else{
//     enableScroll();
//     document.documentElement.style.scrollBehavior = '';
//   }
// }

function GemaNext2Parallax(index){
  let el = parallax[index];
  let items = el.getElementsByClassName('GemaParallaxItem')
  let numberOfItems = items.length;
  if (parallaxCount[index] < numberOfItems){
    items[parallaxCount[index] - 1].classList.remove('visible');
    if(el.classList.contains('zoom')){
      el.classList.remove(`position${parallaxCount[index]}`)
      parallaxCount[index]++;
      el.classList.add(`position${parallaxCount[index]}`)
    } else {
      parallaxCount[index]++;
    }
    items[parallaxCount[index] - 1].classList.add('visible');
  } else if(parallaxCount[index] >= numberOfItems){
    items[parallaxCount[index] - 1].classList.remove('visible');
    if(el.classList.contains('zoom')){
      el.classList.remove(`position${parallaxCount[index]}`)
      parallaxCount[index] = 1;
      el.classList.add(`position${parallaxCount[index]}`)
    } else {
      parallaxCount[index] = 1;
    }
    items[parallaxCount[index] - 1].classList.add('visible');
  }
}

// function GemaPrevParallax(index){
//   console.log(index);
//   let el = parallax[index];
//   let items = el.getElementsByClassName('GemaParallaxItem')
//   if (parallaxCount[index] > 1){
//     items[parallaxCount[index] - 1].classList.remove('visible');
//     if(el.classList.contains('zoom')){
//       el.classList.remove(`position${parallaxCount[index]}`)
//       parallaxCount[index]--;
//       el.classList.add(`position${parallaxCount[index]}`)
//     } else {
//       parallaxCount[index]--;
//     }
//     items[parallaxCount[index] - 1].classList.add('visible');
//   } else {
//     nextParallaxElement = index;
//     prevParallaxElement = index - 1;
//     enableScroll();
//     scrollDisabled = false;
//     inReverse = false;
//   }
// }

// function GemaValidateParallax(){
//   if(!scrollDisabled){
//     if(nextParallaxElement != null && window.pageYOffset >= parallax[nextParallaxElement].offsetTop - 29 && window.pageYOffset <= parallax[nextParallaxElement].offsetTop + 30){
//       console.log('Para el scroll next');
//       disableScroll();
//       scrollDisabled = true;
//       inReverse = false;
//     } else if(prevParallaxElement >= 0) {
//       if(window.pageYOffset >= parallax[prevParallaxElement].offsetTop - 90 &&  window.pageYOffset <= parallax[prevParallaxElement].offsetTop - 31){
//         console.log('Para el scroll prev');
//         disableScroll();
//         scrollDisabled = true;
//         inReverse = true;
//       }
//     }
//   } else {
//     if(scrollTimer !== null) {
//       clearTimeout(scrollTimer);
//     }
//     scrollTimer = setTimeout(function() {
//       console.log('paró');
//       if(!inReverse){
//         GemaNextParallax(nextParallaxElement);
//       } else {
//         GemaPrevParallax(prevParallaxElement);
//       }
//     }, 50);
//   }
// }

// function activateElement(el){
//   el.classList.add('test');
// }
// function unactivateElement(el){
//   el.classList.remove('test');
// }

// function TestValidateParallax(){
//   if(!scrollDisabled && nextParallaxElement != null && window.pageYOffset >= parallax[nextParallaxElement].offsetTop){
//     activateElement(parallax[nextParallaxElement]);
//     disableScroll();
//     scrollDisabled = true;
//     parallax[nextParallaxElement].addEventListener('click', GemaNextParallax);
//   } else if (scrollDisabled){
//     // if(scrollTimer !== null) {
//     //   clearTimeout(scrollTimer);
//     // }
//     // scrollTimer = setTimeout(function() {
//     //   console.log('paró');
//     //   GemaNextParallax(nextParallaxElement);
//     // }, 50);
//   }
// }

if (parallax){
  for (let i = 0; i < parallax.length; i++) {
    parallaxCount.push(1);
  }
}

let scrollTop;
let scrollLeft;

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  document.documentElement.style.scrollBehavior = 'auto';
  window.addEventListener('scroll', stopScroll);
  window.addEventListener('touchmove', stopScroll);
}

function stopScroll(){
  let scY;
  if(!inReverse){
    scY = parallax[nextParallaxElement].offsetTop - 30;
  } else {
    scY = parallax[prevParallaxElement].offsetTop - 30;
  }
  // window.scrollTo(scrollLeft, scY);
  window.scrollTo(scrollLeft, scrollTop);

}

function enableScroll() {
  document.documentElement.style.scrollBehavior = '';
  document.documentElement.style.touchAction = '';
  window.removeEventListener('scroll', stopScroll);
  window.removeEventListener('touchmove', stopScroll);
}


window.onscroll = () => {
  if(stickyElements.length > 0){
    GemaValidateSticky();
  }
  if(document.getElementById('GemaInfonote-header')) {
    document.getElementById('GemaInfonote-header').classList.remove('outstanding');
  }
};


// Slider

let Gemainterval = false;
// Funciones para avanzar, retroceder o reproducir sliders
// Parámetro el: id del slider
// Parámetro cl: clase de los slides
// Parámetro val: valida si el slider tiene puntos (dots) o no
// Parámetro num: número del slide sobre el que se realiza la acción
// Parámetro but: id del botón relacionado a la acción
// Parámetro time: tiempo para la ejecución de la acción

const GemanextSlide = (el, cl) => {
  //Calcula número de slides
  let numberOfSlides = document.getElementsByClassName(cl).length;
  let container = document.getElementById(el);
  // Mide cuántos elementos se muestran
  let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
  let position = parseInt(container.getAttribute('data-position'));
  let percentageToMove = position*(100/numberOfSlides);
  if(position >= (numberOfSlides - maxPosition)){
    position = 0;
    percentageToMove = 0;
  }
  container.setAttribute('data-position', (position + 1));
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  GemaactiveDot(el, (position + 1));
};

const GemaprevSlide = (el, cl) => {
  let numberOfSlides = document.getElementsByClassName(cl).length;
  let container = document.getElementById(el);
  let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(cl)[0].offsetWidth)) - 1;
  let position = parseInt(container.getAttribute('data-position'));
  let percentageToMove = (position - 2) *(100/numberOfSlides);
  if(position <= 1){
    position = (numberOfSlides - maxPosition) + 1;
    percentageToMove = ((numberOfSlides - maxPosition) - 1) *(100/numberOfSlides);
  }
  container.setAttribute('data-position', (position - 1));
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  GemaactiveDot(el, (position - 1));
};

// const GemagotoSlide = (el, cl, num) => {
//   let numberOfSlides = document.getElementsByClassName(cl).length;
//   let container = document.getElementById(el);
//   let position = num;
//   let percentageToMove = (position - 1) *(100/numberOfSlides);
//   container.setAttribute('data-position', position);
//   container.style.transform = 'translateX(-' + percentageToMove + '%)';
//   GemaactiveDot(el, num);
// };

//Activa el punto del slider
function GemaactiveDot(el, num){
  let dots = document.getElementsByClassName(el + '-dot');
  if(dots.length > 0){
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[num - 1].classList.add('active');
  }
}
