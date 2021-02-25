class todoItem {
    constructor(title, description, dueDate, priority, id=null) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        if (id === null) {
            this.id = 'task' + idCount.toString().padStart(4,'0');
            idCount++;
            localStorage.setItem('idCount', idCount);
        } else {
            this.id = id;
        }
    }
}
/* TODO have projects or seperate lists of todos with a default when the 
page is brought up */

function makeTodoCard(task) {
    localStorage.setItem(task.id, JSON.stringify(task));
    var item = document.createElement('div');
    var headline = document.createElement('h2');
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
    hidden.classList.add('contents');
    desc.textContent = task.description;
    due.textContent = task.dueDate;
    options.classList.add('options');
    created.textContent = 'Created: Date Here';
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
    item.appendChild(hidden);
    document.body.appendChild(item);
}



function todoButtonWorks() {
    Object.entries(document.getElementsByClassName('grow')).forEach(function(item) {
        console.log(item[1]);
        if (item[1].firstElementChild.localName === 'h2') {
            item[1].addEventListener('mouseover', function() {
                item[1].children[1].style.display = "block";
            });
            item[1].addEventListener('mouseout', function() {
                item[1].children[1].style.display = "none";
            });
        }
    })

    Object.entries(document.getElementsByClassName('button')).forEach(function(item) {
        item[1].addEventListener('click', function() {
            const _parent = item[1].parentNode.parentNode.parentNode;
            const _found = item[1].title;
            if (_found === 'delete') {
                var targetTask = document.getElementById(_parent.id);
                targetTask.remove();
                localStorage.removeItem(_parent.id);
            } else if (_found === 'edit') {
                console.log('edit');
                console.log(JSON.parse(localStorage.getItem(_parent.id)));
                _parent.innerHTML = '';
                var titleLabel = document.createElement('label');
                titleLabel.htmlFor = 'title';
                titleLabel.textContent = 'Task:';
                var titleBox = document.createElement('input');
                titleBox.type = 'text';
                titleBox.id = 'title';
                titleBox.name = 'title';
                titleBox.required = 'true';
                titleBox.style.display = 'block';
                var descLabel = document.createElement('label');
                descLabel.htmlFor = 'description';
                descLabel.textContent = 'Description:';
                var descBox = document.createElement('textarea');
                descBox.id = 'description';
                descBox.name = 'description';
                descBox.rows = '4';
                descBox.cols = '50';
                descBox.required = 'true';
                var dateLabel = document.createElement('label');
                dateLabel.htmlFor = 'dueDate';
                dateLabel.textContent = 'Due Date:';
                var dateBox = document.createElement('input');
                dateBox.type = 'date';
                dateBox.id = 'dueDate';
                dateBox.name = 'dueDate';
                dateBox.required = 'true';
                var priorityLabel = document.createElement('label');
                priorityLabel.htmlFor = 'priority';
                priorityLabel.textContent = 'Priority:';
                var priBox = document.createElement('select');
                priBox.id = 'priority';
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
                var taskID = document.getElementById(_parent.id)
                taskID.appendChild(titleLabel);
                taskID.appendChild(titleBox);
                taskID.appendChild(descLabel);
                taskID.appendChild(descBox);
                taskID.appendChild(dateLabel);
                taskID.appendChild(dateBox);
                taskID.appendChild(priorityLabel);
                taskID.appendChild(priBox);
                todoButtonWorks();
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
    
    // Need Functionality to edit a previous task
}
var timerMain;
var timerRunning = false;
function startTimer(duration,display=document.querySelector('#time')) {
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
    var currentTime = document.querySelector("#time").textContent;
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
    var description = document.querySelector('#description');
    var dueDate = document.querySelector('#dueDate');
    var priority = document.querySelector('#priority');
    var newTask = new todoItem(title.value, description.value, dueDate.value, priority.value);
    document.querySelector('#inputTodo').style.display = 'none';
    makeTodoCard(newTask);
    todoButtonWorks()
});

/* TODO Interface should be able to do the following: 
    view all projects
    view all todos in each project (perhaps different colors based on pri)
*/

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

