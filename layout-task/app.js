const parents = document.querySelectorAll('.card__time-depart-box');

window.onload = () => {
  for (let elem of parents) {
    let child = elem.querySelectorAll('.card__time-depart');
    let btn = elem.querySelectorAll('.card__time-depart-btn')
    let lastItem = 0;
    let newString = false;

    if (child.length >= 1) {
      let firstItem = child[0]
      for (var i = 1; i < child.length; i++) {
        if (firstItem.getBoundingClientRect().top == child[i].getBoundingClientRect().top) {
          lastItem = i;
        }
        else {
          child[i].classList.add("hidden");
          newString = true;
        }
      }
    }

    if (lastItem && newString) {
      child[lastItem].classList.add("hidden");
      btn[0].classList.remove("hidden");
    }
  }
}


function openSpoiler(x) {
  let child = parents[x].querySelectorAll('.card__time-depart');
  let btn = parents[x].querySelectorAll('.card__time-depart-btn')

  for (var i = 0; i < child.length; i++) {
    child[i].classList.remove("hidden");
  }

  btn[0].classList.add("hidden");
  
}