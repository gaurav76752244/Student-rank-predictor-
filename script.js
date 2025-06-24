const students = [
  { name: "Ayush", rank: "01", marks: "89.9" },
  { name: "Gaurav", rank: "02", marks: "87.6" },
  { name: "Jaydeep", rank: "03", marks: "88.6" },
  { name: "Aman", rank: "04", marks: "87.6" },
  { name: "Rahul", rank: "05", marks: "86.2" },
  { name: "Neele", rank: "06", marks: "84" },
  { name: "Yashmeen", rank: "07", marks: "82.6" },
  { name: "Shivam", rank: "08", marks: "81.6" },
  { name: "Aniket", rank: "09", marks: "80.6" },
  { name: "Muskan", rank: "10", marks: "79.5" },
  { name: "Roshni", rank: "11", marks: "78.6" },
  { name: "Amit", rank: "12", marks: "76.6" },
  { name: "Abhinay", rank: "13", marks: "76.3" },
  { name: "Pramod", rank: "14", marks: "68" },
  { name: "Jaggu", rank: "15", marks: "66.9" },
  { name: "Neeraj", rank: "16", marks: "66.6" },
  { name: "Bade Bhaiya", rank: "17", marks: "65.6" },
  { name: "Nitnesh", rank: "18", marks: "64.6" },
  { name: "Shiva", rank: "19", marks: "62.6" },
  { name: "Sameer", rank: "20", marks: "60.1" }
];

function showSections() {
  const predictor = document.getElementById("predictor");
  const studentDir = document.getElementById("studentDirectory");
  predictor.classList.remove("hidden");
  studentDir.classList.remove("hidden");
  predictor.classList.add("animate-show");
  studentDir.classList.add("animate-show");
  document.querySelector(".btn").style.display = "none";
  const ticker = document.getElementById("ticker");
  if (ticker) ticker.style.display = "none";
}

document.getElementById("rankForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("Name").value.trim();
  const attendance = parseFloat(document.getElementById("Attendance").value);
  const assignment = parseFloat(document.getElementById("assignment").value);
  const studyHours = parseFloat(document.getElementById("study").value);
  const grade = parseFloat(document.getElementById("grade").value);
  const participation = parseFloat(document.getElementById("participation").value);

  if (!name || isNaN(attendance) || isNaN(assignment) || isNaN(studyHours) || isNaN(grade) || isNaN(participation)) {
    document.getElementById("result").innerText = "⚠️ Please fill all fields correctly.";
    return;
  }

  const studyPercent = (studyHours / 8) * 100;

  const newScore = (
    attendance * 0.15 +
    assignment * 0.15 +
    studyPercent * 0.35 +
    grade * 0.2 +
    participation * 0.15
  );

  const allScores = students.map(s => parseFloat(s.marks));
  allScores.push(newScore);
  allScores.sort((a, b) => b - a);
  const rank = allScores.indexOf(newScore) + 1;

  document.getElementById("result").innerText = `📊 Your Performance Score: ${newScore.toFixed(2)} | Estimated Rank: ${rank} out of ${allScores.length}`;

  // Add new student if name doesn't exist
  const exists = students.some(s => s.name.toLowerCase() === name.toLowerCase());
  if (!exists) {
    const newStudent = {
      name: name,
      rank: String(rank).padStart(2, '0'),
      marks: newScore.toFixed(2)
    };
    students.push(newStudent);

    const container = document.getElementById("studentListContainer");
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
      <h3>${newStudent.name}</h3>
      <p><strong>Rank:</strong> ${newStudent.rank}</p>
      <p><strong>Score:</strong> ${newStudent.marks}</p>
    `;

    if (container.classList.contains("show")) {
      container.appendChild(card);
    } else {
      container.classList.remove("loaded");
    }
  }
});

function toggleStudentList() {
  const container = document.getElementById("studentListContainer");
  const button = document.querySelector('#studentDirectory .btn');

  if (!container.classList.contains("loaded")) {
    students.forEach((s) => {
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <h3>${s.name}</h3>
        <p><strong>Rank:</strong> ${s.rank}</p>
        <p><strong>Score:</strong> ${s.marks}</p>
      `;
      container.appendChild(card);
    });
    container.classList.add("loaded");
  }

  container.classList.toggle("show");
  button.textContent = container.classList.contains("show") ? "Hide Students" : "Show Students";
}

function searchStudent() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".student-card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
}

document.querySelector('.hamburger-menu').addEventListener('click', () => {
  document.querySelector('.hamburger-menu').classList.toggle('open');
  document.getElementById('hamburgerDropdown').classList.toggle('show');
});
