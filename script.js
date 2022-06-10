
window.addEventListener("load", () => {
  const preload = document.querySelector(".preload");
  delay(10);
  preload.classList.add("preload-finish");
});

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

// für das einfliegende Flugzeug:
let flyIn = document.querySelector(".flyingPlane");
let isDone;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const callback = function (entries, observer) {
  let observed = entries[0];
  if (observed.isIntersecting) {
    flyIn.classList.add ("slideright");
  }
}

const observer = new IntersectionObserver (callback, options);
if (flyIn) {
  observer.observe (flyIn);
}

