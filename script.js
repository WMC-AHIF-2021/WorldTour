
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