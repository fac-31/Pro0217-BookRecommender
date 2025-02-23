const doorCreak = new Audio("/door-creaking.mp3");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkness").style.opacity = 0;
  setTimeout(() => {
    document.getElementById("darkness").classList.add("hidden");
  }, 2000);
});

const pageTransitionFunc = (destination) => {
  doorCreak.addEventListener("ended", () => {
    window.location.href = destination;
  });
  setTimeout(() => {
    doorCreak.play();
  }, 2000);
};
