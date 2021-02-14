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
    edit.src = "\\PNJaenichen.github.io\\assets\\Edit.jpg";
    trash.src = "\\PNJaenichen.github.io\\assets\\complete.png"
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

/* TODO Interface should be able to do the following: 
    view all projects
    view all todos in each project (perhaps different colors based on pri)
    expand a single todo to see/edit its details
    delete a todo
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
