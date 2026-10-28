const button = document.querySelector('[data-module-complete]');
const key = 'smart-driving-course-completed-v1';
const index = Number(button.dataset.moduleComplete);
let completed = [];
try { completed = JSON.parse(localStorage.getItem(key) || '[]'); if (!Array.isArray(completed)) completed = []; } catch { completed = []; }
function updateButton() {
  const done = completed.includes(index);
  button.classList.toggle('done', done);
  button.setAttribute('aria-pressed', String(done));
  button.textContent = done ? '✓ 已学习 · 点击撤销' : '标记本模块已学习';
}
button.addEventListener('click', () => {
  completed = completed.includes(index) ? completed.filter(item => item !== index) : [...completed, index].sort();
  try { localStorage.setItem(key, JSON.stringify(completed)); } catch {}
  updateButton();
});
updateButton();
