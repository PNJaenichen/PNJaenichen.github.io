class todoItem {
    constructor(title, project, description, dueDate, priority, id=null) {
        this.title = title;
        this.project = project;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        const _today = new Date();
        this.createdDate = `${_today.getFullYear()}-${String(_today.getMonth()).padStart(2, '0')}-${String(_today.getDate()).padStart(2,'0')}`
        if (id === null) {
            this.id = 'task' + idCount.toString().padStart(4,'0');
            idCount++;
            localStorage.setItem('idCount', idCount);
        } else {
            this.id = id;
        }
    }
}

function makeTodoCard(task) {
    localStorage.setItem(task.id, JSON.stringify(task));
    var item = document.createElement('div');
    var headline = document.createElement('h2');
    var priority = document.createElement('div');
    var hidden = document.createElement('div');
    var desc = document.createElement('p');
    var due = document.createElement('p');
    var options = document.createElement('div');
    var created = document.createElement('p');
    var complete = document.createElement('div');
    var edit = document.createElement('div');
    var trash = document.createElement('div');
    item.classList.add('grow');
    item.id = task.id;
    item.style.backgroundColor = '#2a75a9';
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
    complete.innerText = "";
    complete.classList.add('button');
    complete.classList.add('completeMark');
    complete.title = 'complete';
    edit.innerText = "\u270e";
    edit.classList.add('button')
    edit.title = 'edit';
    trash.innerText = "\u2718";
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
    var projectDiv = document.getElementById('projects');
    if (document.getElementById(task.project)) {
        document.getElementById(task.project).appendChild(item);   
    } else {
        var newProj = document.createElement('div');
        var projTitle = document.createElement('h3');
        newProj.id = task.project;
        projTitle.textContent = task.project;
        newProj.appendChild(projTitle);
        newProj.classList.add('project');
        newProj.appendChild(item);
        projectDiv.appendChild(newProj);
    }
}

function todoButtonWorks() {
    Object.entries(document.getElementsByClassName('grow')).forEach(function(item) {
        console.log(item[1]);
        item[1].addEventListener('mouseover', function taskExtend() {
            if(item[1].children[2]) {
                item[1].children[2].style.display = 'block';
            }
        });
        item[1].addEventListener('mouseout', function taskShrink() {
            if(item[1].children[2]) {
                item[1].children[2].style.display = 'none';
            }
        });
    });

    Object.entries(document.getElementsByClassName('button')).forEach(function(item) {
        item[1].addEventListener('click', function() {
            const _parent = item[1].parentNode.parentNode.parentNode;
            const _found = item[1].title;
            if (_found === 'remove') {
                var targetTask = document.getElementById(_parent.id);
                targetTask.remove();
                localStorage.removeItem(_parent.id);
            } else if (_found === 'edit') {
                var currTask = JSON.parse(localStorage.getItem(_parent.id));
                _parent.innerHTML = '';
                var titleLabel = document.createElement('label');
                titleLabel.htmlFor = 'newTitle';
                titleLabel.textContent = 'Task:';
                var titleBox = document.createElement('input');
                titleBox.type = 'text';
                titleBox.id = 'newTitle';
                titleBox.name = 'title';
                titleBox.required = true;
                titleBox.value = currTask.title;
                var projectLabel = document.createElement('label');
                projectLabel.htmlFor = 'newProject';
                projectLabel.textContent = 'Project:';
                var projectBox = document.createElement('input');
                projectBox.type = 'text';
                projectBox.id = 'newProject';
                projectBox.name = 'project';
                projectBox.value = currTask.project;
                var descLabel = document.createElement('label');
                descLabel.htmlFor = 'newDescription';
                descLabel.textContent = 'Description:';
                var descBox = document.createElement('textarea');
                descBox.id = 'newDescription';
                descBox.name = 'description';
                descBox.rows = '4';
                descBox.cols = '50';
                descBox.required = true;
                descBox.value = currTask.description;
                var dateLabel = document.createElement('label');
                dateLabel.htmlFor = 'newDate';
                dateLabel.textContent = 'Due Date:';
                var dateBox = document.createElement('input');
                dateBox.type = 'date';
                dateBox.id = 'newDate';
                dateBox.name = 'dueDate';
                dateBox.required = true;
                dateBox.value = currTask.dueDate;
                var priorityLabel = document.createElement('label');
                priorityLabel.htmlFor = 'newPriority';
                priorityLabel.textContent = 'Priority:';
                var priBox = document.createElement('select');
                priBox.id = 'newPriority';
                priBox.name = 'priority';
                var priOne = document.createElement('option');
                priOne.value = '1';
                priOne.textContent = 'High';
                var priTwo = document.createElement('option');
                priTwo.value = '2';
                priTwo.textContent = 'Medium';
                var priThree = document.createElement('option');
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
                var subButton = document.createElement('button');
                subButton.id = 'editTask';
                subButton.type = 'submit';
                subButton.value = 'submit';
                subButton.textContent = 'Submit';
                var taskID = document.getElementById(_parent.id)
                var editForm = document.createElement('div');
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
                document.getElementById('editTask').addEventListener('click', function() {
                    var title = document.querySelector('#newTitle');
                    var project = document.querySelector('#newProject');
                    var description = document.querySelector('#newDescription');
                    var dueDate = document.querySelector('#newDate');
                    var priority = document.querySelector('#newPriority');
                    var newTask = new todoItem(title.value, project.value, description.value, dueDate.value, priority.value, currTask.id);
                    document.getElementById(currTask.id).remove();
                    makeTodoCard(newTask);
                    todoButtonWorks()
                })

            } else if (_found === 'complete') {
                if (item[1].innerText === '') {
                    item[1].innerText = '\u2714';
                    _parent.style.opacity = '0.5';
                } else {
                    item[1].innerText = '';
                    _parent.style.opacity = '1';
                }
            }
        });
    });
}
var timerMain;
var timerRunning = false;
function startTimer(duration,display=document.querySelector('#timerFace')) {
    timerRunning = true;
    var timer = duration, minutes, seconds;
    timerMain = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
function restartTimer(){
    clearInterval(timerMain);
    var currentTime = document.querySelector("#timerFace").textContent;
    var time = currentTime.split(':');
    startTimer((parseInt(time[0]) * 60) + parseInt(time[1]));
}
document.querySelector('#reset50').addEventListener('click', function() {
    clearInterval(timerMain);
    startTimer(3000);
});
document.querySelector('#break10').addEventListener('click', function() {
    clearInterval(timerMain);
    startTimer(600);
});
document.querySelector('#pauseRestart').addEventListener('click', function() {
    if (timerRunning) {
        clearInterval(timerMain);
        timerRunning = false;
    } else {
        restartTimer();
    }
});

document.querySelector('#newTodo').addEventListener('click', function() {
    document.querySelector('#inputTodo').style.display = 'block';
});

document.querySelector('#addButton').addEventListener('click', function() {
    var title = document.querySelector('#title');
    var project = document.querySelector('#project');
    var description = document.querySelector('#description');
    var dueDate = document.querySelector('#dueDate');
    var priority = document.querySelector('#priority');
    var newTask = new todoItem(title.value, project.value, description.value, dueDate.value, priority.value);
    document.querySelector('#inputTodo').style.display = 'none';
    makeTodoCard(newTask);
    todoButtonWorks()
});

Object.entries(localStorage).forEach(function(item) {
    if (item[0] !== 'idCount') {
        makeTodoCard(JSON.parse(item[1]));
    }
})

if (localStorage.getItem('idCount')) {
    var idCount = localStorage.getItem('idCount');
} else {
    var idCount = 1;
}

todoButtonWorks()

