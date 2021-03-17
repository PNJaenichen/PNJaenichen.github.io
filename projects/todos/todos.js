/* eslint-disable linebreak-style */
function makeTodoCard(task) {
  localStorage.setItem(task.id, JSON.stringify(task));
  const item = document.createElement('div');
  const headline = document.createElement('h2');
  const priority = document.createElement('div');
  const hidden = document.createElement('div');
  const desc = document.createElement('p');
  const due = document.createElement('p');
  const options = document.createElement('div');
  const created = document.createElement('p');
  const complete = document.createElement('div');
  const edit = document.createElement('div');
  const trash = document.createElement('div');
  item.classList.add('grow');
  item.id = task.id;
  item.style.backgroundColor = '#2a75a9';
  const today = new Date();
  const dueDate = new Date(task.dueDate);
  const daysDue = Math.floor((dueDate - today) / 86400000) + 1;
  if (daysDue > 3) {
    item.style.borderColor = 'black';
  } else if (daysDue >= 1) {
    item.style.borderColor = 'green';
  } else if (daysDue === 0) {
    item.style.borderColor = 'yellow';
  } else {
    item.style.borderColor = 'red';
  }
  headline.textContent = task.title;
  priority.classList.add('priority');
  switch (task.priority) {
    case '3':
      priority.style.backgroundColor = 'green';
      break;
    case '2':
      priority.style.backgroundColor = 'yellow';
      break;
    default:
      priority.style.backgroundColor = 'red';
      break;
  }
  hidden.classList.add('contents');
  desc.textContent = task.description;
  due.textContent = task.dueDate;
  options.classList.add('options');
  created.textContent = `Created: ${task.createdDate}`;
  complete.innerText = '';
  complete.classList.add('button');
  complete.classList.add('completeMark');
  complete.title = 'complete';
  edit.innerText = '\u270e';
  edit.classList.add('button');
  edit.title = 'edit';
  trash.innerText = '\u2718';
  trash.classList.add('button');
  trash.title = 'remove';
  options.appendChild(created);
  options.appendChild(complete);
  options.appendChild(edit);
  options.appendChild(trash);
  hidden.appendChild(desc);
  hidden.appendChild(due);
  hidden.appendChild(options);
  item.appendChild(headline);
  item.appendChild(priority);
  item.appendChild(hidden);
  const projectDiv = document.getElementById('projects');
  if (document.getElementById(task.project)) {
    document.getElementById(task.project).appendChild(item);
  } else {
    const newProj = document.createElement('div');
    const projTitle = document.createElement('h3');
    newProj.id = task.project;
    projTitle.textContent = task.project;
    newProj.appendChild(projTitle);
    newProj.classList.add('project');
    newProj.appendChild(item);
    projectDiv.appendChild(newProj);
  }
}

Object.entries(localStorage).forEach((item) => {
  if (item[0] !== 'idCount') {
    makeTodoCard(JSON.parse(item[1]));
  }
});

if (localStorage.getItem('idCount')) {
  // eslint-disable-next-line no-unused-vars
  const idCount = localStorage.getItem('idCount');
} else {
  // eslint-disable-next-line no-unused-vars
  const idCount = 1;
}

class TodoItem {
  constructor(title, project, description, dueDate, priority, id = null) {
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    const today = new Date();
    this.createdDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (id === null) {
      // eslint-disable-next-line no-undef
      this.id = `task ${idCount.toString().padStart(4, '0')}`;
      // eslint-disable-next-line no-undef
      idCount += 1;
      // eslint-disable-next-line no-undef
      localStorage.setItem('idCount', idCount);
    } else {
      this.id = id;
    }
  }
}

function todoButtonWorks() {
  Object.entries(document.getElementsByClassName('grow')).forEach((item) => {
    const todoButton = item[1];
    item[1].addEventListener('mouseover', () => {
      if (item[1].children[2]) {
        todoButton.children[2].style.display = 'block';
      }
    });
    item[1].addEventListener('mouseout', () => {
      if (item[1].children[2]) {
        todoButton.children[2].style.display = 'none';
      }
    });
  });

  Object.entries(document.getElementsByClassName('button')).forEach((item) => {
    const todoButton = item[1];
    item[1].addEventListener('click', () => {
      const parent = item[1].parentNode.parentNode.parentNode;
      const found = item[1].title;
      if (found === 'remove') {
        const targetTask = document.getElementById(parent.id);
        targetTask.remove();
        localStorage.removeItem(parent.id);
      } else if (found === 'edit') {
        const currTask = JSON.parse(localStorage.getItem(parent.id));
        parent.innerHTML = '';
        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = 'newTitle';
        titleLabel.textContent = 'Task:';
        const titleBox = document.createElement('input');
        titleBox.type = 'text';
        titleBox.id = 'newTitle';
        titleBox.name = 'title';
        titleBox.required = true;
        titleBox.value = currTask.title;
        const projectLabel = document.createElement('label');
        projectLabel.htmlFor = 'newProject';
        projectLabel.textContent = 'Project:';
        const projectBox = document.createElement('input');
        projectBox.type = 'text';
        projectBox.id = 'newProject';
        projectBox.name = 'project';
        projectBox.value = currTask.project;
        const descLabel = document.createElement('label');
        descLabel.htmlFor = 'newDescription';
        descLabel.textContent = 'Description:';
        const descBox = document.createElement('textarea');
        descBox.id = 'newDescription';
        descBox.name = 'description';
        descBox.rows = '4';
        descBox.cols = '50';
        descBox.required = true;
        descBox.value = currTask.description;
        const dateLabel = document.createElement('label');
        dateLabel.htmlFor = 'newDate';
        dateLabel.textContent = 'Due Date:';
        const dateBox = document.createElement('input');
        dateBox.type = 'date';
        dateBox.id = 'newDate';
        dateBox.name = 'dueDate';
        dateBox.required = true;
        dateBox.value = currTask.dueDate;
        const priorityLabel = document.createElement('label');
        priorityLabel.htmlFor = 'newPriority';
        priorityLabel.textContent = 'Priority:';
        const priBox = document.createElement('select');
        priBox.id = 'newPriority';
        priBox.name = 'priority';
        const priOne = document.createElement('option');
        priOne.value = '1';
        priOne.textContent = 'High';
        const priTwo = document.createElement('option');
        priTwo.value = '2';
        priTwo.textContent = 'Medium';
        const priThree = document.createElement('option');
        priThree.value = '3';
        priThree.textContent = 'Low';
        priBox.appendChild(priOne);
        priBox.appendChild(priTwo);
        priBox.appendChild(priThree);
        switch (currTask.priority) {
          case '1':
            priOne.selected = true;
            break;
          case '2':
            priTwo.selected = true;
            break;
          default:
            priThree.selected = true;
            break;
        }
        const subButton = document.createElement('button');
        subButton.id = 'editTask';
        subButton.type = 'submit';
        subButton.value = 'submit';
        subButton.textContent = 'Submit';
        const taskID = document.getElementById(parent.id);
        const editForm = document.createElement('div');
        editForm.appendChild(titleLabel);
        editForm.appendChild(titleBox);
        editForm.appendChild(projectLabel);
        editForm.appendChild(projectBox);
        editForm.appendChild(descLabel);
        editForm.appendChild(descBox);
        editForm.appendChild(dateLabel);
        editForm.appendChild(dateBox);
        editForm.appendChild(priorityLabel);
        editForm.appendChild(priBox);
        editForm.appendChild(subButton);
        taskID.appendChild(editForm);
        document.getElementById('editTask').addEventListener('click', () => {
          const title = document.querySelector('#newTitle');
          const project = document.querySelector('#newProject');
          const description = document.querySelector('#newDescription');
          const dueDate = document.querySelector('#newDate');
          const priority = document.querySelector('#newPriority');
          const newTask = new TodoItem(title.value, project.value, description.value,
            dueDate.value, priority.value, currTask.id);
          document.getElementById(currTask.id).remove();
          makeTodoCard(newTask);
          todoButtonWorks();
        });
      } else if (found === 'complete') {
        if (item[1].innerText === '') {
          todoButton.innerText = '\u2714';
          parent.style.opacity = '0.5';
        } else {
          todoButton.innerText = '';
          parent.style.opacity = '1';
        }
      }
    });
  });
}

let timerMain;
let timerRunning = false;

function startTimer(duration, display = document.querySelector('#timerFace')) {
  const screen = display;
  timerRunning = true;
  let timer = duration; let minutes; let
    seconds;
  timerMain = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    screen.textContent = `${minutes}:${seconds}`;
    if ((timer - 1) < 0) {
      timer = duration;
    }
  }, 1000);
}

function restartTimer() {
  clearInterval(timerMain);
  const currentTime = document.querySelector('#timerFace').textContent;
  const time = currentTime.split(':');
  startTimer((parseInt(time[0], 10) * 60) + parseInt(time[1], 10));
}

document.querySelector('#reset50').addEventListener('click', () => {
  clearInterval(timerMain);
  startTimer(3000);
});

document.querySelector('#break10').addEventListener('click', () => {
  clearInterval(timerMain);
  startTimer(600);
});

document.querySelector('#pauseRestart').addEventListener('click', () => {
  if (timerRunning) {
    clearInterval(timerMain);
    timerRunning = false;
  } else {
    restartTimer();
  }
});

document.querySelector('#newTodo').addEventListener('click', () => {
  document.querySelector('#inputTodo').style.display = 'block';
});

document.querySelector('#addButton').addEventListener('click', () => {
  const title = document.querySelector('#title');
  const project = document.querySelector('#project');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#dueDate');
  const priority = document.querySelector('#priority');
  const newTask = new TodoItem(title.value, project.value, description.value, dueDate.value,
    priority.value);
  document.querySelector('#inputTodo').style.display = 'none';
  makeTodoCard(newTask);
  todoButtonWorks();
});

todoButtonWorks();
