const storageKey = 'smart-driving-course-completed-v1';
let completed = [];
try { completed = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (!Array.isArray(completed)) completed = []; } catch { completed = []; }
if (document.getElementById('progress-text')) {
document.getElementById('progress-text').textContent = `已完成 ${completed.length} / 5 个模块`;
document.getElementById('progress-fill').style.width = `${completed.length * 20}%`;
document.querySelector('.progress-track').setAttribute('aria-valuenow', String(completed.length));
}

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const opened = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? '关闭导航菜单' : '打开导航菜单');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '打开导航菜单');
}));

