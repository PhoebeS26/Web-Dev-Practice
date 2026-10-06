const colourBox = document.getElementById("colour-box");
const changeButton = document.getElementById("change-colour");
const resetButton = document.getElementById("reset-colour");
const rgbValue = document.getElementById("rgb-value");

changeButton.addEventListener("click", function() {

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let colour = `rgb(${red}, ${green}, ${blue})`;

    colourBox.style.backgroundColor = colour;

    rgbValue.textContent = colour;
});

resetButton.addEventListener("click", function() {

    colourBox.style.backgroundColor = "rgb(0, 0, 0)";

    rgbValue.textContent = "RGB(0, 0, 0)";
});