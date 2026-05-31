/* ===================== CHAPTERS ===================== */

const chapters = {
 physics: [
  "Chapter 1: Units and Measurements",
  "Chapter 2: Motion in a Straight Line",
  "Chapter 3: Motion in a Plane",
  "Chapter 4: Laws of Motion",
  "Chapter 5: Work, Energy and Power",
  "Chapter 6: System of Particles and Rotational Motion",
  "Chapter 7: Gravitation",
  "Chapter 8: Mechanical Properties of Solids",
  "Chapter 9: Mechanical Properties of Fluids",
  "Chapter 10: Thermal Properties of Matter",
  "Chapter 11: Thermodynamics",
  "Chapter 12: Kinetic Theory",
  "Chapter 13: Oscillations",
  "Chapter 14: Waves"
 ],

 chemistry: [
  "Chapter 1: Some Basic Concepts of Chemistry",
  "Chapter 2: Structure of Atom",
  "Chapter 3: Classification of Elements",
  "Chapter 4: Chemical Bonding",
  "Chapter 5: States of Matter",
  "Chapter 6: Thermodynamics",
  "Chapter 7: Equilibrium",
  "Chapter 8: Redox Reactions",
  "Chapter 9: Hydrogen",
  "Chapter 10: s-Block Elements",
  "Chapter 11: p-Block Elements",
  "Chapter 12: Organic Chemistry Basics",
  "Chapter 13: Hydrocarbons",
  "Chapter 14: Environmental Chemistry"
 ],

 biology: [
  "Chapter 1: The Living World",
  "Chapter 2: Biological Classification",
  "Chapter 3: Plant Kingdom",
  "Chapter 4: Animal Kingdom",
  "Chapter 5: Morphology of Flowering Plants",
  "Chapter 6: Anatomy of Flowering Plants",
  "Chapter 7: Structural Organisation in Animals",
  "Chapter 8: Cell: The Unit of Life",
  "Chapter 9: Biomolecules",
  "Chapter 10: Cell Cycle and Cell Division",
  "Chapter 11: Transport in Plants",
  "Chapter 12: Mineral Nutrition",
  "Chapter 13: Photosynthesis in Higher Plants",
  "Chapter 14: Respiration in Plants",
  "Chapter 15: Plant Growth and Development",
  "Chapter 16: Digestion and Absorption",
  "Chapter 17: Breathing and Exchange of Gases",
  "Chapter 18: Body Fluids and Circulation",
  "Chapter 19: Excretory Products and Elimination"
 ],

 maths: [
  "Chapter 1: Sets",
  "Chapter 2: Relations and Functions",
  "Chapter 3: Trigonometric Functions",
  "Chapter 4: Complex Numbers and Quadratic Equations",
  "Chapter 5: Linear Inequalities",
  "Chapter 6: Permutations and Combinations",
  "Chapter 7: Binomial Theorem",
  "Chapter 8: Sequences and Series",
  "Chapter 9: Straight Lines",
  "Chapter 10: Conic Sections",
  "Chapter 11: 3D Geometry Introduction",
  "Chapter 12: Limits and Derivatives",
  "Chapter 13: Statistics",
  "Chapter 14: Probability"
 ],

 english: [
  "Hornbill - Prose: The Portrait of a Lady",
  "Hornbill - Prose: We’re Not Afraid to Die",
  "Hornbill - Prose: Discovering Tut",
  "Hornbill - Prose: The Ailing Planet",
  "Hornbill - Prose: The Browning Version",
  "Hornbill - Prose: Silk Road",
  "Hornbill - Poetry: A Photograph",
  "Hornbill - Poetry: The Laburnum Top",
  "Hornbill - Poetry: The Voice of the Rain",
  "Hornbill - Poetry: Childhood",
  "Hornbill - Poetry: Father to Son",
  "Snapshots: The Summer of the Beautiful White Horse",
  "Snapshots: The Address",
  "Snapshots: Ranga’s Marriage",
  "Snapshots: Albert Einstein at School",
  "Snapshots: Mother’s Day",
  "Snapshots: Birth",
  "Snapshots: The Tale of Melon City"
 ]
};

/* ===================== MCQ BANK ===================== */

const mcq = {
 "Chapter 1: Units and Measurements": [
  {
   q: "SI unit of length is?",
   o: ["meter", "kg", "second", "joule"],
   a: 0
  },
  {
   q: "SI unit of mass is?",
   o: ["meter", "kg", "second", "kelvin"],
   a: 1
  },
  {
   q: "Force dimension is?",
   o: ["MLT⁻²", "MLT", "M⁻¹L", "LT²"],
   a: 0
  },
  {
   q: "Derived unit is?",
   o: ["meter", "kg", "newton", "second"],
   a: 2
  },
  {
   q: "0.00450 has significant figures?",
   o: ["2", "3", "4", "5"],
   a: 1
  }
 ]
};

/* ===================== VARIABLES ===================== */

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;
let currentChapter = "";
let resultLog = [];

/* ===================== SUBJECT ===================== */

function openSubject(sub){
 document.getElementById("subjects").style.display = "none";
 document.getElementById("chapters").style.display = "block";

 let box = document.getElementById("chapters");
 box.innerHTML = `<h2>${sub.toUpperCase()} Chapters</h2>`;

 chapters[sub].forEach(ch=>{
  let div = document.createElement("div");
  div.className = "chapter";
  div.innerText = ch;
  div.onclick = ()=> startQuiz(ch);
  box.appendChild(div);
 });
}

/* ===================== QUIZ ===================== */

function startQuiz(chapter){
 currentChapter = chapter;
 currentQ = 0;
 score = 0;
 resultLog = [];

 document.getElementById("chapters").style.display = "none";
 document.getElementById("quizBox").style.display = "block";

 loadQuestion();
 startTimer();
}

function loadQuestion(){
 let q = mcq[currentChapter][currentQ];

 document.getElementById("question").innerHTML =
  `<b>Question ${currentQ + 1}</b><br>${q.q}`;

 q.o.forEach((opt,i)=>{
  document.getElementById("opt"+i).innerText = opt;
 });
}

function answer(i){
 let q = mcq[currentChapter][currentQ];
 let isCorrect = (i === q.a);

 resultLog.push({
  q: q.q,
  selected: q.o[i],
  correct: q.o[q.a],
  status: isCorrect
 });

 if(isCorrect) score++;

 currentQ++;

 if(currentQ < mcq[currentChapter].length){
  loadQuestion();
  resetTimer();
 } else {
  showResult();
 }
}

/* ===================== TIMER ===================== */

function startTimer(){
 clearInterval(timer);
 timeLeft = 15;

 timer = setInterval(()=>{
  document.getElementById("timer").innerText = timeLeft;
  timeLeft--;

  if(timeLeft < 0){
   clearInterval(timer);
   showResult();
  }
 },1000);
}

function resetTimer(){
 clearInterval(timer);
 startTimer();
}

/* ===================== RESULT ===================== */

function showResult(){
  clearInterval(timer);

  // SCORE SHOW
  document.getElementById("scoreBox").innerHTML =
    `<h2>Quiz Completed</h2>
     <p><b>Score:</b> ${score} / ${resultLog.length}</p>`;

  // REVIEW ALWAYS VISIBLE
  let reviewHTML = "<h3>📘 Review Answers</h3>";

  resultLog.forEach((r, i)=>{
    reviewHTML += `
      <div style="
        background:${r.status ? '#d4edda' : '#f8d7da'};
        padding:10px;
        margin:10px 0;
        border-radius:8px;
      ">
        <b>Q${i+1}:</b> ${r.q} <br><br>
        <b>Your Answer:</b> ${r.selected} <br>
        <b>Correct:</b> ${r.correct} <br><br>
        <b>Status:</b> ${r.status ? "✔ Correct" : "❌ Wrong"}
      </div>
    `;
  });

  document.getElementById("reviewBox").innerHTML = reviewHTML;

  // GRAPH
  showGraph();
}

/* ===================== GRAPH ===================== */

function showGraph(){
  let correct = resultLog.filter(r => r.status).length;
  let wrong = resultLog.length - correct;

  const ctx = document.getElementById("resultChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [{
        data: [correct, wrong],
        backgroundColor: ["#22c55e", "#ef4444"] // green / red
      }]
    }
  });
}

/* ===================== BACK ===================== */

function goBack(){
 location.reload();
}