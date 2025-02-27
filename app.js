const colorPickerBtn = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// const allColors = document.querySelectorAll(".colors");
// const pickedColors = [];

//step 05
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]"); //parse convert string to array

//step 01
const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper(); //EyeDropper is a built-in object
    console.log(eyeDropper);
    // const test = eyeDropper.open();
    // console.log(test);

    // const { sRGBHex } = await eyeDropper.open(); //{sRGBHex} is destructuring
    // console.log(sRGBHex);
    const colorCode = await eyeDropper.open();
    console.log(colorCode.sRGBHex);
    navigator.clipboard.writeText(colorCode.sRGBHex); //copy the color code to clipboard

    pickedColors.push(colorCode.sRGBHex);

    console.log(pickedColors);
    showColor();

    //step 04
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  } catch (error) {
    alert("Failed to activate Eye Dropper");
  }
};

//step 02
const showColor = () => {
  if (pickedColors.length > 0) {
    // return;
    document.querySelector(".picked-colors").style.display = "block";
    colorList.innerHTML = pickedColors
      .map(
        (color) => ` 
         <li class="colors">
            <span class="rect" style="background-color:${color} "></span>
            <span class="value hex">${color}</span>
          </li>

          `
      )
      .join(""); //join() method joins all elements of an array into a string

    //step 07
    let colors = document.querySelectorAll(".colors");
    console.log(colors);
    colors.forEach((l) => {
      l.addEventListener("click", (Event) => {
        let color = Event.target.innerText;
        // console.log(Event.target.dataset);
        navigator.clipboard.writeText(Event.target.innerText);
        Event.target.innerText = "Copied";

        //set timeout to change the text back to the color code
        setTimeout(() => {
          Event.target.innerText = color;
        }, 1000);
      });
    });
  } else {
    document.querySelector(".picked-colors").style.display = "none";
  }
};

//step 03
const clearListOfColors = () => {
  // colorList.innerHTML = "";
  //step 06
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors)); //stringify convert array to string
  document.querySelector(".picked-colors").style.display = "none";
};

//Activate Eye Dropper when colorPicker button is clicked
colorPickerBtn.addEventListener("click", activateEyeDropper);

//call clearListOfColors function when clearAll button is clicked
clearAll.addEventListener("click", clearListOfColors);

//show color by default
showColor();
//document.querySelector(".picked-colors").style.display = "none";
