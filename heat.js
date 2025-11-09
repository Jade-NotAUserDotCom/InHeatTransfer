let heat = 0;
let timerInterval = null;
let timerIntervalCool = null;

function smoking() {
  smoke = document.querySelector("#smoke");
  if (heat > 10) {
    smoke.src = "pictures/smoke.png";
  } else {
    smoke.src = "";
  }
}

function cook() {
  //cooks the stew
  heat = heat + 0.25;
  smoking();
}

function cool() {
  // cools the stew
  heat = heat - 0.25;
  smoking();
  if (heat == 0) {
    cancelCooling(); //stops the cooling interval when heat is 0
  }
}

function cancelCooling() {
  //stops the cooling, when called both by the cool() and the button when fire is lit again
  clearInterval(timerIntervalCool);
  timerIntervalCool = null;
}

//contents of second html
function replace(topic) {
  document.querySelector("#topic").innerHTML = topic;
  const lesson = document.querySelector("#LESSON");
  const lecture = document.querySelector("#lecture");
  const formula = document.querySelector("#formula");
  const index = document.querySelector("#indexes"); //ul
  const samples = document.querySelector("#samples"); //ul
  const video = document.querySelector("#link");
  const visual = document.querySelector("#visual");

  let formulas = ["Q = (K * A * (Th-Tc))/d", "Q = hc ∙ A ∙ (Ts - Tf)", "P = e * \u03C3 * A * (Tr - Tc)4"];

  let ConductionIndex = [
    "Q is the transfer of heat per unit time",
    "K is the thermal conductivity of the body",
    "A is the area of heat transfer",
    "Th is the temperature of the hot region",
    "Tcold is the temperature of the cold region",
    "d is the thickness of the body",
  ];

  let ConvectionIndex = [
    "Q is the heat transferred per unit time",
    "hc is the coefficient of convective heat transfer",
    "A is the area of heat transfer",
    "Ts is the surface temperature",
    "Tf is the fluid temperature",
  ];

  let RadiationIndex = [
    "P is the net power of radiation",
    "A is the area of radiation",
    "Tr is the radiator temperature",
    "Tc is the surrounding temperature",
    "e is emissivity", 
    "\u03C3 is Stefan's constant (\u03C3 = 5.67 x 10-8Wm-2K-4)",

  ];

  let ConductionSample = [
    "Pressing a hot iron on clothes transfers heat from the iron to the fabric.",
    "Holding an ice cube causes it to melt as heat from your hand moves into the ice.",
    "Walking barefoot on the beach on a hot day—heat from the sand is conducted to your feet.",
  ];

  let ConvectionSample = [
    "Boiling water: Hot water from the bottom rises while cooler water sinks, forming convection currents.",
    "Ocean currents: Warm water near the equator flows toward the poles, while colder water moves in the opposite direction.",
    "Blood circulation: In warm-blooded animals, convection helps distribute heat evenly throughout the body."
  ];

  let RadiationSample = [
    "The microwaves in an oven heat food through electromagnetic radiation.",
    "Sunlight (UV and infrared rays) warms the Earth.",
    "The radioactive decay of elements like Uranium-238 releases energy through radiation."
  ]

  switch (topic) {
    case "Conduction":
        visual.src = "pictures/conduction.jpeg";
      lecture.innerHTML =
        "Conduction happens when heat moves from an area of higher temperature to an area of lower temperature through direct contact. The faster-moving (high-energy) particles collide with slower ones, causing them to speed up and gain energy. This process continues throughout the material, transferring heat. Because of this, conduction is often called thermal conduction or heat conduction.";
      formula.innerHTML = formulas[0];
      if (index.children.length > 0) {
        index.innerHTML = "";
      }
      if (samples.children.length > 0) {
        samples.innerHTML = "";
      }
      for (let Index of ConductionIndex) {
        let li = document.createElement("li");
        li.textContent = Index;
        index.appendChild(li);
      }
      for (let Sample of ConductionSample) {
        let li = document.createElement("li");
        li.textContent = Sample;
        samples.appendChild(li);
      }
      video.innerHTML = "Conduction Lesson";
      video.href = "https://www.youtube.com/watch?v=9joLYfayee8";
      break;
    case "Convection":
        visual.src = "pictures/convection.jpeg";
      lecture.innerHTML =
        "Convection occurs when heat is transferred through the movement of a fluid (liquid or gas). When part of the fluid is heated, it expands, becomes less dense, and rises. The cooler, denser fluid then moves down to take its place, creating a circular flow called a convection current.";
      formula.innerHTML = formulas[1];
      if (index.children.length > 0) {
        index.innerHTML = "";
      }
      if (samples.children.length > 0) {
        samples.innerHTML = "";
      }
      for (let Index of ConvectionIndex) {
        let li = document.createElement("li");
        li.textContent = Index;
        index.appendChild(li);
      }
      for (let Sample of ConvectionSample) {
        let li = document.createElement("li");
        li.textContent = Sample;
        samples.appendChild(li);
      }
      video.innerHTML = "Convection Lesson";
      video.href = "https://www.youtube.com/watch?v=VxGIiOTuAIs";
      break;
    case "Radiation":
        visual.src = "pictures/radiation.jpeg";
      lecture.innerHTML =
        "Radiation transfers heat through electromagnetic waves-mainly infrared radiation-without needing any physical medium. This means radiation can occur even in a vacuum, such as the heat from the sun reaching Earth.<br>As temperature rises, the wavelength in the spectra of the radiation emitted decreases and shorter wavelengths of radiation are emitted. Thermal radiation can be calculated by Stefan-Boltzmann law:<br>Radiation transfers heat through electromagnetic waves-mainly infrared radiation-without needing any physical medium. This means radiation can occur even in a vacuum, such as the heat from the sun reaching Earth.";
      formula.innerHTML = formulas[2];
      if (index.children.length > 0) {
        index.innerHTML = "";
      }
      if (samples.children.length > 0) {
        samples.innerHTML = "";
      }
      for (let Index of RadiationIndex) {
        let li = document.createElement("li");
        li.textContent = Index;
        index.appendChild(li);
      }
      for (let Sample of RadiationSample) {
        let li = document.createElement("li");
        li.textContent = Sample;
        samples.appendChild(li);
      }
      video.innerHTML = "Radiation Lesson";
      video.href = "https://www.youtube.com/watch?v=5GoZZKcNZiQ";
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let contents = "";
  const cookBTN = document.querySelector("#cook");
  const DemoBTN = document.querySelector("#demonstration");
  const ConDuctBTN = document.querySelector("#conduction");
  const ConVecBTN = document.querySelector("#convection");
  const RadBTN = document.querySelector("#radiation");
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");

  if (topic) {
    replace(topic);
    contents = topic;
  }

  if (cookBTN) {
    cookBTN.onclick = () => {
      if (!timerInterval) {
        document.querySelector("#fire").src = "pictures/fire.png";
        timerInterval = setInterval(cook, 250);
      } else if (timerInterval) {
        document.querySelector("#fire").src = "";
        if (heat > 0 && timerIntervalCool) {
          cancelCooling();
          timerInterval = setInterval(cook, 250);
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          timerIntervalCool = setInterval(cool, 250);
        }
      }
      if (cookBTN.textContent === "Open Fire") {
        cookBTN.textContent = "Close Fire";
      } else {
        cookBTN.textContent = "Open Fire";
      }
    };
  }

  ConDuctBTN.onclick = () => {
    if (contents != "conduction") {
      contents = "conduction";
      replace("Conduction");
    }
  };

  ConVecBTN.onclick = () => {
    if (contents != "convection") {
      contents = "convection";
      replace("Convection");
    }
  };

  RadBTN.onclick = () => {
    if (contents != "radiation") {
      contents = "radiation";
      replace("Radiation");
    }
  };
});
