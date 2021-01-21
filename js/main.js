import {
  myLibrary, saveLibrary, Book, Card, toggleModal,
  windowOnClick, statusChange, checkStatus, title,
  author, pages, read, row, closeButton, deleteBook,
} from './library';

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
  deleteBtn.addEventListener('click', toggleModal);

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

function restoreLocal(myLibrary) {
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

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

const btn = document.querySelector('#createBtn');
btn.addEventListener('click', addBookToLibrary);

restoreLocal();
