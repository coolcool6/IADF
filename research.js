const researchForm = document.getElementById('research-form');
const promptField = document.getElementById('research-prompt');
const copyButton = document.getElementById('copy-prompt');
researchForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(researchForm);
  const interest = String(data.get('interest') || '').trim();
  const scene = String(data.get('scene') || '').trim();
  const method = String(data.get('method') || '').trim() || '请比较至少两种可行方法';
  promptField.value = `请作为智能驾驶基础课程的研究助理，围绕以下信息，帮助我形成一份可供教师讨论的研究方案草稿。不要编造文献、实验数据或已验证的结论；不确定的信息请标注待核实。\n\n研究兴趣或问题：${interest}\n应用场景：${scene}\n拟采用的方法：${method}\n\n请按以下结构输出：\n1. 研究问题、边界和必要假设\n2. 2–3 个候选选题及各自的创新点与可行性\n3. 推荐选题与选择理由\n4. 感知、决策、规划、控制模块的相关性\n5. 技术路线与关键算法步骤\n6. 数据或仿真环境、基线方案、评价指标\n7. 安全约束、失效场景、潜在风险与缓解措施\n8. 需要我继续检索和核实的资料清单`;
  copyButton.disabled = false;
  document.getElementById('copy-status').textContent = '模板已生成，可复制到你使用的 AI 工具中继续完善。';
});
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(promptField.value);
    document.getElementById('copy-status').textContent = '已复制任务模板。';
  } catch {
    promptField.select();
    document.getElementById('copy-status').textContent = '自动复制未成功，已选中文本；请手动复制。';
  }
});

