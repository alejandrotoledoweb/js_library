let myLibrary = [];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#readStatus');
const row = document.querySelector('.row');

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// the same attributes from the form in the html file

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function Card(book) {
  this.book = book;
}

function deleteBook(mybook) {
  const bookIndex = myLibrary.indexOf(mybook.target);
  myLibrary.splice(bookIndex, 1);
  saveLibrary();
  mybook.target.offsetParent.parentElement.remove();
}

function statusChange(status) {
  if (status.target.textContent === 'Read') {
    status.target.textContent = 'Not Read';
  } else {
    status.target.textContent = 'Read';
  }
}

function checkStatus(book, btn) {
  if (book.read) {
    btn.textContent = 'Read';
  } else {
    btn.textContent = 'Not Read';
  }
}


var modal = document.querySelector(".modal1");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


Card.prototype.createCard = (book) => {
  const column = document.createElement('section');
  column.className = 'mb-3 col-3';

  const card = document.createElement('div');
  card.className = 'shadow card';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = book.title;

  const subTitle = document.createElement('h6');
  subTitle.className = 'card-subtitle';
  subTitle.textContent = book.author;

  const cardPages = document.createElement('p');
  cardPages.classList.add('card-text');
  cardPages.textContent = `${book.pages} pages`;

  const bookRead = document.createElement('button');
  bookRead.className = 'btn btn-secondary mr-3 pr-3';
  bookRead.addEventListener('click', statusChange);
  checkStatus(book, bookRead);

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.className = 'btn btn-danger ml-2 pl-2 btn-delete';
  deleteBtn.textContent = 'Delete Book';
  deleteBtn.addEventListener('click', deleteBook);
  deleteBtn.addEventListener("click", toggleModal);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(subTitle);
  cardBody.appendChild(cardPages);
  cardBody.appendChild(bookRead);
  cardBody.appendChild(deleteBtn);
  card.appendChild(cardBody);
  column.appendChild(card);
  row.appendChild(column);
};

function resetList() {
  row.innerHTML = '';
}

function newBook(bookCard) {
  resetList();
  myLibrary.forEach((book) => {
    bookCard.createCard(book);
  });
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (myLibrary === null) myLibrary = [];
  const bookCard = new Card();
  newBook(bookCard);
}

function cleanInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

function addBookToLibrary() {
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  saveLibrary();
  const bookCard = new Card(book);
  newBook(bookCard);
  cleanInputs();
}

const btn = document.querySelector('#createBtn');
btn.addEventListener('click', addBookToLibrary);

restoreLocal();
