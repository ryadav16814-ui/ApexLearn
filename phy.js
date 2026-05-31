// ======================
// CHAPTERS
// ======================
const chapters = {
  1: "Units and Measurements",
  2: "Motion in Straight Line",
  3: "Motion in Plane",
  4: "Laws of Motion",
  5: "Work Energy Power",
  6: "Rotational Motion",
  7: "Gravitation",
  8: "Solids",
  9: "Fluids",
  10: "Thermal Properties",
  11: "Thermodynamics",
  12: "Kinetic Theory",
  13: "Oscillations",
  14: "Waves"
};

// ======================
// QUESTIONS (sample structure)
// ======================
const questions = {
  1: [
    {
      q: "SI unit of length?",
      options: ["Meter", "Kg", "Second", "Newton"],
      answer: 0
    },
    {
      q: "SI unit of mass?",
      options: ["Meter", "Kg", "Second", "Ampere"],
      answer: 1
    }
  ],
  2: [
    {
      q: "Speed formula?",
      options: ["d/t", "t/d", "d*t", "d+t"],
      answer: 0
    }
  ]
};

// ======================
// STATE
// ======================
let currentChapter = 0;
let currentQ = 0;
let timer;
let time = 15;

let score = 0;
let userReview = [];

// ======================
// CREATE CHAPTER LIST
// ======================
window.onload = function () {
  let box = document.getElementById("chapters");

  for (let key in chapters) {
    box.innerHTML += `
      <h2 onclick="loadChapter(${key})">
        ${chapters[key]}
      </h2>
    `;
  }
};

// ======================
// LOAD CHAPTER
// ======================
function loadChapter(id) {
  currentChapter = id;
  currentQ = 0;
  score = 0;
  userReview = [];

  document.getElementById("chapters").style.display = "none";
  document.getElementById("quizBox").style.display = "block";

  document.getElementById("chapterName").innerText =
    "📘 " + chapters[id];

  loadQuestion();
  startTimer();
}

// ======================
// LOAD QUESTION
// ======================
function loadQuestion() {
  let q = questions[currentChapter][currentQ];

  if (!q) {
    showResult();
    return;
  }

  document.getElementById("question").innerText =
    "Q" + (currentQ + 1) + ": " + q.q;

  let html = "";

  q.options.forEach((opt, i) => {
    html += `
      <button class="option" onclick="selectAnswer(${i})">
        ${opt}
      </button>
    `;
  });

  document.getElementById("options").innerHTML = html;
}

// ======================
// ANSWER SELECT
// ======================
function selectAnswer(i) {
  let q = questions[currentChapter][currentQ];

  userReview.push({
    question: q.q,
    user: q.options[i],        // ✅ actual text
    correct: q.options[q.answer] // ✅ actual text
  });

  if (i === q.answer) {
    score++;
  }

  nextQ();
}
// ======================
// NEXT
// ======================
function nextQ() {
  currentQ++;

  if (!questions[currentChapter][currentQ]) {
    showResult();
    return;
  }

  resetTimer();
  loadQuestion();
}

// ======================
// SKIP
// ======================
function skipQ() {
  let q = questions[currentChapter][currentQ];

  userReview.push({
    question: q.q,
    user: "Skipped",
    correct: q.options[q.answer] // ✅ actual answer text
  });

  nextQ();
}

// ======================
// BACK
// ======================
function backQ() {
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
}

// ======================
// TIMER
// ======================
function startTimer() {
  clearInterval(timer);
  time = 15;

  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time === 0) {
      skipQ();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

// ======================
// RESULT SYSTEM (PIE + BAR + REVIEW)
// ======================
function showResult() {

  document.getElementById("quizBox").style.display = "none";
  document.getElementById("resultBox").style.display = "block";

  let total = userReview.length;
  let wrong = total - score;
  let accuracy = Math.round((score / total) * 100);

  // PIE CHART
  new Chart(document.getElementById("pie"), {
    type: "pie",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [{
        data: [score, wrong]
      }]
    }
  });

  // BAR CHART
  new Chart(document.getElementById("bar"), {
    type: "bar",
    data: {
      labels: ["Score", "Accuracy %"],
      datasets: [{
        data: [score, accuracy]
      }]
    }
  });

  // REVIEW SYSTEM
  let html = "<h3>📘 Review</h3>";

  userReview.forEach((item, i) => {
    html += `
      <p>
        Q${i + 1}: ${item.question}<br>
        Your Answer: ${item.user}<br>
        Correct Answer: ${item.correct}
      </p>
      <hr>
    `;
  });

  document.getElementById("review").innerHTML = html;
}

// ======================
// HOME
// ======================
function goHome() {
  location.reload();
}