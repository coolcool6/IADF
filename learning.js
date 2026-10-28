const learningKey = 'smart-driving-learning-v1';
let learningState = {};
try { learningState = JSON.parse(localStorage.getItem(learningKey) || '{}') || {}; } catch { learningState = {}; }
const saveLearningState = () => { try { localStorage.setItem(learningKey, JSON.stringify(learningState)); } catch {} };
const topicNames = { perception:'感知与定位', planning:'决策与规划', control:'车辆运动控制', safety:'功能安全与车路协同' };
const resourceLinks = { perception:'modules/02-perception.html', planning:'modules/03-planning.html', control:'modules/04-control.html', safety:'modules/05-integration.html' };

function showTextResult(container, lines) {
  container.replaceChildren();
  lines.forEach((line, index) => {
    const element = document.createElement(index === 0 ? 'strong' : 'p');
    element.textContent = line;
    container.append(element);
  });
  container.hidden = false;
}
function renderRecommendation() {
  const summary = document.getElementById('personal-recommendation');
  const level = learningState.level;
  document.querySelectorAll('[data-level]').forEach(card => card.classList.toggle('recommended', card.dataset.level === level));
  if (!level && !learningState.topic) return;
  summary.replaceChildren();
  const lead = document.createElement('strong'); lead.textContent = level === 'foundation' ? '建议从基础资源开始。' : level === 'application' ? '可以尝试综合场景任务。' : level === 'intermediate' ? '建议进入关键技术模块。' : '学习方向已记录。';
  summary.append(lead);
  if (learningState.topic) {
    const link = document.createElement('a');
    link.href = resourceLinks[learningState.topic];
    link.textContent = `优先学习：${topicNames[learningState.topic]} ↗`;
    summary.append(link);
  }
}

document.querySelectorAll('[data-survey]').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const result = form.querySelector('.form-result');
  if (form.dataset.survey === 'foundation') {
    const sum = ['control','coding','sensor'].reduce((total, key) => total + Number(data.get(key)), 0);
    learningState.level = sum <= 2 ? 'foundation' : sum >= 5 ? 'application' : 'intermediate';
    showTextResult(result, ['问卷已完成。', sum <= 2 ? '建议先复习反馈控制、坐标系与传感器基础，再进入模块一。' : sum >= 5 ? '你已有较好的先修基础，可尝试综合模块与项目任务。' : '建议从模块二至四依次学习，边学边做案例练习。']);
  } else {
    learningState.topic = data.get('topic');
    const format = {concept:'概念图解与讲义',case:'交通场景案例',practice:'仿真与动手练习'}[data.get('format')];
    showTextResult(result, ['学习需求已记录。', `建议先进入“${topicNames[learningState.topic]}”模块，并优先使用${format}。`]);
  }
  saveLearningState(); renderRecommendation();
}));

const answerKeys = {
  prerequisite: { answers:['a','b','c'], explanations:['闭环控制使用反馈修正控制输入。','横向跟踪关注车辆相对目标轨迹的横向与航向误差。','坐标转换使来自不同传感器的观测能在统一坐标系中比较。'] },
  systems: { answers:['b','a','c'], explanations:['感知模块提供周围环境信息。','轨迹必须满足道路规则、避障与车辆运动约束。','关键部件失效时需要风险受控的降级或安全处置。'] }
};
document.querySelectorAll('[data-test]').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  const key = form.dataset.test, config = answerKeys[key], data = new FormData(form);
  const score = config.answers.reduce((total, answer, index) => total + Number(data.get(`q${index + 1}`) === answer), 0);
  learningState[key] = score;
  learningState.level = score <= 1 ? 'foundation' : score === 2 ? 'intermediate' : 'application';
  const advice = score <= 1 ? '建议先回顾课程概览与模块一。' : score === 2 ? '基础已建立，继续检查尚不熟悉的概念。' : '基础掌握较好，可以进入综合模块。';
  showTextResult(form.querySelector('.form-result'), [`答对 ${score} / 3 题。${advice}`, ...config.explanations.map((text, index) => `第 ${index + 1} 题：${text}`)]);
  saveLearningState(); renderRecommendation();
}));
renderRecommendation();

