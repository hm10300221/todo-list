// タブとタスクの管理
let tabs = ['仕事', 'プライベート'];
let currentTab = '仕事';
let tasks = {
  '仕事': [],
  'プライベート': [],
};

// HTML要素の取得
const tabsEl = document.getElementById('tabs');
const addTabBtn = document.getElementById('addTabBtn');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// タブを描画
function renderTabs() {
  tabsEl.innerHTML = '';
  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (tab === currentTab ? ' active' : '');
    btn.textContent = tab;
    btn.addEventListener('click', () => {
      currentTab = tab;
      renderTabs();
      renderTasks();
    });
    tabsEl.appendChild(btn);
  });
}

// タスクを描画
function renderTasks() {
  taskList.innerHTML = '';
  tasks[currentTab].forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    // ○ボタン
    const circle = document.createElement('div');
    circle.className = 'task-circle' + (task.done ? ' done' : '');
    circle.addEventListener('click', () => {
      tasks[currentTab][index].done = !tasks[currentTab][index].done;
      renderTasks();
    });

    // テキスト
    const text = document.createElement('span');
    text.className = 'task-text' + (task.done ? ' done' : '');
    text.textContent = task.text;

    // 削除ボタン
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      tasks[currentTab].splice(index, 1);
      renderTasks();
    });

    li.appendChild(circle);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// タスク追加
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks[currentTab].push({ text, done: false });
  taskInput.value = '';
  renderTasks();
}

// タブ追加
addTabBtn.addEventListener('click', () => {
  const name = prompt('タブの名前を入力してください');
  if (!name || name.trim() === '') return;
  const trimmed = name.trim();
  if (tabs.includes(trimmed)) {
    alert('同じ名前のタブがすでにあります');
    return;
  }
  tabs.push(trimmed);
  tasks[trimmed] = [];
  currentTab = trimmed;
  renderTabs();
  renderTasks();
});

// タスク追加ボタン
addTaskBtn.addEventListener('click', addTask);

// Enterキーでも追加
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// 初期描画
rend