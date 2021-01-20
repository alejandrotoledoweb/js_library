let myLibrary = [];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#readStatus');
const row = document.querySelector('.row');
const modal = document.querySelector('.modal1');
const closeButton = document.querySelector('.close-button');

function Card(book) {
  this.book = book;
}

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
