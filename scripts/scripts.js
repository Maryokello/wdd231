console.log("✅ scripts.js is loaded");

// Responsive nav toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('site-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

// Dynamic copyright
const cp = document.getElementById('copyright');
if (cp) {
  cp.innerHTML = `&copy; ${new Date().getFullYear()} Mary Okello`;
}

// Last modified date
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

// Courses array
const courses = [
  { code: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { code: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { code: 'WDD', number: 231, title: 'Frontend Development I', credits: 3, completed: false },
  { code: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { code: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
  { code: 'CSE', number: 210, title: 'Programming with Classes', credits: 4, completed: false }
];

const coursesContainer = document.getElementById('courses');
const creditTotal = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.chip[data-filter]');

function renderCourses(list) {
  coursesContainer.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('article');
    card.className = 'card' + (c.completed ? ' completed' : '');
    card.innerHTML = `
      <h3>${c.code} ${c.number} – ${c.title}</h3>
      <div>${c.credits} credits</div>
      <div>${c.completed ? 'Completed' : 'In Progress'}</div>
    `;
    coursesContainer.appendChild(card);
  });

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditTotal.textContent = total;
}

function applyFilter(filter) {
  let filtered = courses;
  if (filter === 'WDD') filtered = courses.filter(c => c.code === 'WDD');
  if (filter === 'CSE') filtered = courses.filter(c => c.code === 'CSE');
  renderCourses(filtered);
  filterButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.filter === filter));
}

// Initialize
renderCourses(courses);
applyFilter('all');

// Button events
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

