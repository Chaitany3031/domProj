function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var allFullElems = document.querySelectorAll(".fullElem");
  var allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allFullElems[back.id].style.display = "none";
      // console.log(back.id);
    });
  });
}
openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (e, idx) {
      sum =
        sum +
        `<div class="task">
              <h5>${e.task}<span class=${e.imp}>imp</span></h5>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    // location.reload()

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
        // location.reload();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    // location.reload();
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
  });

  // localStorage.clear()
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );
  // console.log(hours);

  var wholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum += `<div class="day-planner-time">
   <p>${elem}</p>
   <input id=${idx} type="text" placeholder="..." value=${savedData}>
   </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner()

var motivationQuote = document.querySelector('.motivation-2 h1')
var motivationAuthor = document.querySelector('.motivation-2 h2')

async function fetchQuote() {
  try {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random');
    const data = await response.json();
    motivationQuote.textContent = data.en;
    motivationAuthor.textContent = data.author || "Unknown";
  } catch (error) {
    console.error("Error fetching quote:", error);
    motivationQuote.textContent = "Unable to fetch quote.";
    motivationAuthor.textContent = "";
  }
}






fetchQuote()