/* eslint-disable linebreak-style */
const myLibrary = [];
const library = document.getElementById('bookList');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const addContainer = document.getElementById('container');

function makeNewBookButton() {
  addContainer.innerHTML = '';
  const aButt = document.createElement('button');
  aButt.id = 'addBook';
  aButt.innerHTML = 'New Book';
  addContainer.appendChild(aButt);
  const newBook = document.getElementById('addBook');
  // eslint-disable-next-line no-use-before-define
  newBook.addEventListener('click', makeBookForm);
}

function printLibrary() {
  library.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const element = document.createElement('div');
    element.classList.add('card');
    element.textContent = `${myLibrary[i].title}\r\n`;
    for (let j = 0; j < myLibrary[i].length; j += 1) {
      if (myLibrary[i][j][0] !== 'title') {
        element.textContent += ` ${myLibrary[i][j][0]}: ${myLibrary[i][j][1]} `;
        element.textContent += ' \r\n ';
      }
    }
    const readButton = document.createElement('button');
    readButton.innerHTML = 'READ';
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'REMOVE';
    element.append(readButton);
    element.append(removeButton);
    library.append(element);
  }
}

function submission() {
  const subBook = document.getElementById('submitBook');
  subBook.onclick = () => {
    const title = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    if (title !== '') {
      addBookToLibrary(title, author, parseInt(pages, 10), read);
      makeNewBookButton();
      printLibrary();
    }
  };
}

function makeBookForm() {
  makeNewBookButton();
  const bookForm = document.createElement('form');
  const titleLabel = document.createElement('label');
  const authorLabel = document.createElement('label');
  const pageLabel = document.createElement('label');
  const readLabel = document.createElement('label');
  titleLabel.id = 'title-label';
  authorLabel.id = 'author-label';
  pageLabel.id = 'page-label';
  readLabel.id = 'read-label';
  titleLabel.innerHTML = '*Title:';
  authorLabel.innerHTML = 'Author:';
  pageLabel.innerHTML = 'Pages:';
  readLabel.innerHTML = 'Read?';
  titleLabel.htmlFor = 'title';
  authorLabel.htmlFor = 'author';
  pageLabel.htmlFor = 'pages';
  readLabel.htmlFor = 'read';
  const titleIn = document.createElement('input');
  const authorIn = document.createElement('input');
  const pageIn = document.createElement('input');
  const readIn = document.createElement('input');
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
  pageIn.placeholder = 'Enter Page Count';
  titleIn.required = true;
  pageIn.min = 1;
  pageIn.max = 99999;
  readIn.name = 'pages-read';
  readIn.checked = false;
  const submitButton = document.createElement('input');
  submitButton.id = 'submitBook';
  submitButton.type = 'submit';
  submitButton.value = 'Submit';
  bookForm.appendChild(titleLabel);
  bookForm.appendChild(titleIn);
  bookForm.appendChild(authorLabel);
  bookForm.appendChild(authorIn);
  bookForm.appendChild(pageLabel);
  bookForm.appendChild(pageIn);
  bookForm.appendChild(readLabel);
  bookForm.appendChild(readIn);
  bookForm.appendChild(submitButton);
  addContainer.appendChild(bookForm);
  submission();
}

addBookToLibrary('Rhythm of War', 'Brandon Sanderson', 1232, false);
// addBookToLibrary("A Wise Man's Fear",'Patrick Rothfuss',994,true);
// addBookToLibrary("Chesty", "Jon T. Hoffman", 676, false);

library.addEventListener('click', (e) => {
  const targetTitle = e.target.parentNode.textContent.split('\r\n');
  let index = null;
  for (let i = 0; i < myLibrary.length; i += 1) {
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
