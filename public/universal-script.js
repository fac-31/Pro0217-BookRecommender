const doorCreak = new Audio("/door-creaking.mp3");

document.addEventListener("DOMContentLoaded", () => {
  const darkness = document.getElementById("darkness");
  if (!darkness)
    return; // page don't have darkness

  darkness.style.opacity = 0;
  setTimeout(() => {
    darkness.classList.add("hidden");
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
