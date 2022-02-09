document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.methodToggle();
    document.getElementById("theme-source").textContent = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.methodSystem();
    document.getElementById("theme-source").textContent = "System";
  });

// document.getElementById("clock-start").addEventListener("click", () => {
//   let sec = 0;
//   setInterval(() => {
//     sec += 1;
//     document.getElementById("clock").textContent = sec;
//   }, 1000);
// });
