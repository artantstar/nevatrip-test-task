
// let hours = new Date();
// var localHours = (hours.getTimezoneOffset() / 60) * -1
// let time = 20

// if ((time + localHours) < 0) localHours = localHours + 24
// if ((time + localHours) > 23) localHours = localHours - 24

// if (time + localHours >= 10)
//   console.log((time + localHours) + ':00')
// else
//   console.log('0' + (time + localHours) + ':00')


const route = document.querySelector('#route');
const timeA = document.querySelector('#timeA');
const timeB = document.querySelector('#timeB');
const routeAB = document.querySelector('.routeAB');
const routeBA = document.querySelector('.routeBA');
const btn = document.querySelector('button');
const ticket = document.querySelector('#num');
let price;
let currentRoute;
let timeRoute;
let timeDepart;
let timeArrival;
let resultTime;
let resultTiming;
 

function easyRoute(event) {
  // routeBA.classList.add("hidden");
  timeDepart = event.target.value
  timeArrival = moment(timeDepart, 'HH:mm').add(50, 'm').format('HH:mm');
  resultTime = `Это путешествие займет у вас ${timeRoute}.`
  resultTiming = `Теплоход отправляется в ${timeDepart}, а прибудет в ${timeArrival}.`
}

function hardRoute(event) {
  timeDepart = event.target.value
  routeBA.classList.remove("hidden");
}



route.addEventListener('change', (event) => {

  clear();
  // console.log(event.target.value)
  if (event.target.value == 'из A в B') {
    routeAB.classList.remove("hidden");
    price = 700;
    currentRoute = event.target.value;
    timeRoute = '50 минут';

    timeA.addEventListener('change', easyRoute);
  }
  if (event.target.value == 'из B в A') {
    routeBA.classList.remove("hidden");
    price = 700;
    currentRoute = event.target.value;
    timeRoute = '50 минут';

    timeB.addEventListener('change', easyRoute);
  }
  if (event.target.value == 'из A в B и обратно в А') {
    routeAB.classList.remove("hidden");
    price = 1200;
    currentRoute = event.target.value;

    timeA.addEventListener('change', hardRoute);

    // timeA.addEventListener('change', (event) => {
    //   routeBA.classList.remove("hidden");
    // });

  }

});

function clear() {
  routeAB.classList.add("hidden");
  routeBA.classList.add("hidden");

  timeA.removeEventListener('change', easyRoute);
  timeB.removeEventListener('change', easyRoute);
  timeA.removeEventListener('change', hardRoute);
  // timeB.removeEventListener('change');

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
}

btn.addEventListener('click', (event) => {
  if (ticket.value && price && timeRoute) {
    if (ticket.value == 1) console.log(`Вы выбрали ${ticket.value} билет по маршруту ${currentRoute} стоимостью ${ticket.value * price}р.\nЭто путешествие займет у вас ${timeRoute}. `)
    if (ticket.value >= 2 && ticket.value <= 4) console.log(`Вы выбрали ${ticket.value} билета по ${currentRoute} маршруту стоимостью ${ticket.value * price}р.\nЭто путешествие займет у вас ${timeRoute}. `)
    if (ticket.value >= 5) console.log(`Вы выбрали ${ticket.value} билетов по ${currentRoute} маршруту стоимостью ${ticket.value * price}р.\nЭто путешествие займет у вас ${timeRoute}. `)
  } else console.log(`Выберите маршрут и количество билетов`)
});
