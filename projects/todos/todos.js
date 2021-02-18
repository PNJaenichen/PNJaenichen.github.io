// 'todos' are ojects that can be dynamically created

class todoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}
/* TODO have projects or seperate lists of todos with a default when the 
page is brought up */

function makeTodoCard(task) {
    var item = document.createElement('div');
    var headline = document.createElement('h2');
    var hidden = document.createElement('div');
    var desc = document.createElement('p');
    var due = document.createElement('p');
    var options = document.createElement('div');
    var created = document.createElement('p');
    var complete = document.createElement('img');
    var edit = document.createElement('img');
    var trash = document.createElement('img');
    item.classList.add('grow');
    item.id = 'task' + idCount.toString().padStart(4,'0');
    idCount++;
    item.style.backgroundColor = '#2a75a9';
    headline.textContent = task.title;
    hidden.classList.add('contents');
    hidden.style.display = 'none';
    desc.textContent = task.description;
    due.textContent = task.dueDate;
    options.classList.add('options');
    created.textContent = 'Created: Date Here';
    complete.src = "\\PNJaenichen.github.io\\assets\\delete.png"
    edit.src = "\\PNJaenichen.github.io\\assets\\edit.jpg";
    trash.src = "\\PNJaenichen.github.io\\assets\\complete.png"
    complete.classList.add('button');
    edit.classList.add('button');
    trash.classList.add('button');
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
})

/* TODO Interface should be able to do the following: 
    view all projects
    view all todos in each project (perhaps different colors based on pri)
*/

// use localStorage to save user's projects and todos between sessions

var idCount = 1;

var taskOne = new todoItem('This is the task', 'This contains extra information about the task.', '28 Feb 2021', 1);
var taskTwo = new todoItem('This is another task', 'This is a second tab for testing purposes.', '28 Feb 2021', 2);
makeTodoCard(taskOne);
makeTodoCard(taskTwo);

Object.entries(document.getElementsByClassName('grow')).forEach(function(item) {
    item[1].addEventListener('mouseover', function() {
        item[1].children[1].style.display = "block";
    });
    item[1].addEventListener('mouseout', function() {
        item[1].children[1].style.display = "none";
    });
})

Object.entries(document.getElementsByClassName('button')).forEach(function(item) {
    item[1].addEventListener('click', function() {
        const _parent = item[1].parentNode.parentNode.parentNode;
        const _found = item[1].src.match(/(\w+)(\.png|\.jpg)/)[1];
        if (_found === 'delete') {
            var targetTask = document.getElementById(_parent.id);
            targetTask.remove();
        } else {
            console.log(_parent.id, _found);
        }
    });
});
