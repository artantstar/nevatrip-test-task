const route = document.querySelector('#route');
const timeA = document.querySelector('#timeA');
const timeB = document.querySelector('#timeB');
const routeAB = document.querySelector('.routeAB');
const routeBA = document.querySelector('.routeBA');
const btn = document.querySelector('button');
const ticket = document.querySelector('#num');
const divResult = document.querySelectorAll('.result span');
let price;
let currentRoute;
let timeRoute;
let timeDepart;
let timeArrival;
let resultTime;
let resultTiming;
let resultPrice;
let gmt = moment().format('Z');

function timeZone(event) {
  for (i = 1; i < event.length; i++) {
    let a = moment(event[i].value, 'HH:mm').add(gmt).format('HH:mm')
    event[i].value = a
    event[i].innerHTML = a
  }
}
timeZone(timeA);
timeZone(timeB);


function easyRoute(event) {
  clearSpan();
  timeDepart = event.target.value
  timeArrival = moment(timeDepart, 'HH:mm').add(50, 'm').format('HH:mm');
  timeRoute = '50 минут';
}

function hardRouteA(event) {
  clearSpan();
  timeDepart = event.target.value
  routeBA.classList.remove("hidden");
  delTime();
  timeB.addEventListener('change', hardRouteB);

}

function hardRouteB(event) {
  timeArrival = moment(event.target.value, 'HH:mm').add(50, 'm').format('HH:mm');
  let a = moment(timeDepart, 'HH:mm')
  let b = moment(timeArrival, 'HH:mm')
  let c = a.diff(b)
  timeRoute = humanizeDuration(c, { language: "ru" })
}

function result() {
  clearSpan();
  if (!ticket.value || ticket.value <= 0 || !currentRoute || !timeRoute) {
    if (!currentRoute) {
      divResult[3].innerHTML = 'Не выбран маршрут'
      divResult[3].hidden = false;

    } else if (!timeRoute) {
      divResult[4].innerHTML = 'Не выбрано время'
      divResult[4].hidden = false;
    }
    if (!ticket.value || ticket.value <= 0) {
      divResult[5].innerHTML = 'Неправильное количество билетов.'
      divResult[5].hidden = false;
    }
    return
  } else {
    if (ticket.value == 1) resultPrice = `Вы выбрали ${ticket.value} билет по маршруту ${currentRoute} стоимостью ${ticket.value * price}р.`
    if (ticket.value >= 2 && ticket.value <= 4) resultPrice = `Вы выбрали ${ticket.value} билета по ${currentRoute} маршруту стоимостью ${ticket.value * price}р.`
    if (ticket.value >= 5) resultPrice = `Вы выбрали ${ticket.value} билетов по ${currentRoute} маршруту стоимостью ${ticket.value * price}р.`

    resultTime = `Это путешествие займет у вас ${timeRoute}.`
    resultTiming = `Теплоход отправляется в ${timeDepart}, а прибудет в ${timeArrival}.`
  }
  divResult[0].innerHTML = resultPrice
  divResult[1].innerHTML = resultTime
  divResult[2].innerHTML = resultTiming
  divResult[0].hidden = false;
  divResult[1].hidden = false;
  divResult[2].hidden = false;
}

function delTime() {
  for (i = 1; i < timeB.length; i++) {
    let a = moment(timeDepart, 'HH:mm').add(50, 'm')
    let b = moment(timeB[i].value, 'HH:mm')

    if (b >= a) {
      timeB[i].disabled = false;
      timeB[i].hidden = false;
    } else if (b < a) {
      timeB[i].disabled = true;
      timeB[i].hidden = true;
    }
  }
}

function clearTime() {
  for (i = 1; i < timeB.length; i++) {
    timeB[i].disabled = false;
    timeB[i].hidden = false;
  }
}

route.addEventListener('change', (event) => {

  clear();

  if (event.target.value == 'из A в B') {
    routeAB.classList.remove("hidden");
    price = 700;
    currentRoute = event.target.value;

    timeA.addEventListener('change', easyRoute);
  }
  if (event.target.value == 'из B в A') {
    routeBA.classList.remove("hidden");
    price = 700;
    currentRoute = event.target.value;

    timeB.addEventListener('change', easyRoute);
  }
  if (event.target.value == 'из A в B и обратно в А') {
    routeAB.classList.remove("hidden");
    price = 1200;
    currentRoute = event.target.value;

    timeA.addEventListener('change', hardRouteA);
  }
});

function clear() {
  timeA.removeEventListener('change', easyRoute);
  timeB.removeEventListener('change', easyRoute);
  timeA.removeEventListener('change', hardRouteA);
  timeB.removeEventListener('change', hardRouteB);
  btn.removeEventListener('change', result);

  routeAB.classList.add("hidden");
  routeBA.classList.add("hidden");

  clearTime();
  clearSpan();

  timeA.selectedIndex = 0;
  timeB.selectedIndex = 0;
  ticket.value = '';

  price = undefined;
  currentRoute = undefined;
  timeRoute = undefined;
  timeDepart = undefined;
  timeArrival = undefined;
  resultTime = undefined;
  resultTiming = undefined;
  resultPrice = undefined;
}

function clearSpan() {
  for (i = 0; i < 6; i++) {
    divResult[i].innerHTML = ''
    divResult[i].hidden = true;
  }
}

btn.addEventListener('click', result);