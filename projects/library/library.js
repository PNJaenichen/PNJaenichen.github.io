let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`);
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

let addButton = document.getElementById('addBook');
let addContainer = document.getElementById('container');

function makeBookForm() {
    makeNewBookButton()
    let titleLabel = document.createElement('label');
    let authorLabel = document.createElement('label');
    let pageLabel = document.createElement('label');
    let readLabel = document.createElement('label');
    titleLabel.id = 'title-label';
    authorLabel.id = 'author-label';
    pageLabel.id = 'page-label';
    readLabel.id = 'read-label';
    titleLabel.innerHTML = 'Title:';
    authorLabel.innerHTML = 'Author:';
    pageLabel.innerHTML = 'Pages:';
    readLabel.innerHTML = 'Read?';
    titleLabel.htmlFor = 'title';
    authorLabel.htmlFor = 'author';
    pageLabel.htmlFor = 'pages';
    readLabel.htmlFor = 'read';
    let titleIn = document.createElement('input');
    let authorIn = document.createElement('input');
    let pageIn = document.createElement('input');
    let readIn = document.createElement('input');
    titleIn.id = 'name';
    authorIn.id = 'author';
    pageIn.id = 'pages';
    readIn.id = 'read';
    titleIn.type = 'text';
    authorIn.type = 'text';
    pageIn.type = 'number';
    readIn.type = 'checkbox';
    titleIn.placeholder = 'Enter Book Title';
    authorIn.placeholder = "Enter Author's Name";
    pageIn.placeholder = "Enter Page Count";
    titleIn.required = true;
    pageIn.min = 1;
    pageIn.max = 99999;
    readIn.name = 'pages-read';
    readIn.checked = false;
    let submitButton = document.createElement('input');
    submitButton.id = 'submitBook';
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    readLabel.appendChild(readIn);
    addContainer.appendChild(titleLabel);
    addContainer.appendChild(titleIn);
    addContainer.appendChild(authorLabel);
    addContainer.appendChild(authorIn);
    addContainer.appendChild(pageLabel);
    addContainer.appendChild(pageIn);
    addContainer.appendChild(readLabel);
    addContainer.appendChild(submitButton);
    submission();
}

function submission() {
    let subBook = document.getElementById('submitBook');
    subBook.onclick = function(){
        let title = document.getElementById('name').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let read = document.getElementById('read').checked;
        addBookToLibrary(title, author, parseInt(pages), read);
        makeNewBookButton();
        printLibrary();
    };
}

function makeNewBookButton() {
    addContainer.innerHTML = '';
    let aButt = document.createElement('button');
    aButt.id = 'addBook';
    aButt.innerHTML = 'New Book';
    addContainer.appendChild(aButt);
    let newBook = document.getElementById('addBook');
    newBook.addEventListener('click', makeBookForm);
}

// addBookToLibrary('Rhythm of War', 'Brandon Sanderson', 1232, false);
// addBookToLibrary("A Wise Man's Fear",'Patrick Rothfuss',994,true);
// addBookToLibrary("Chesty", "Jon T. Hoffman", 676, false);

let library = document.getElementById('bookList');

function printLibrary() {
    library.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let element = document.createElement('div');
        element.classList.add('card');
        element.textContent = `${myLibrary[i].title}\r\n`;
        for (let [key, value] of Object.entries(myLibrary[i])) {
            if (key === 'title') {
                continue;
            } else {
                element.textContent += ` ${key}: ${value} `;
                element.textContent += ' \r\n ';
                // let para = document.createElement('p');
                // para.innerHTML = `${key}: ${value}`;
                // element.append(para);
            }
        }
        let readButton = document.createElement('button');
        readButton.innerHTML = 'READ';
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'REMOVE';
        element.append(readButton);
        element.append(removeButton);
        library.append(element);
    }
}

library.addEventListener('click', function(e) {
    let targetTitle = e.target.parentNode.textContent.split('\r\n');
    let index = null;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === targetTitle[0].trim()) {
            index = i;
        }
    }
    if (e.target.innerHTML === 'READ') {
        if (myLibrary[index].read) {
            myLibrary[index].read = false;
        } else {
            myLibrary[index].read = true;
        }
    } else if (e.target.innerHTML === 'REMOVE') {
        myLibrary.splice(index, 1);
    }
    printLibrary();
});

printLibrary();
makeNewBookButton();

