const myLibrary = [];

export { myLibrary };
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#readStatus");
const row = document.querySelector(".row");
const modal = document.querySelector(".modal1");
const closeButton = document.querySelector(".close-button");

export { title, author, pages, read, row, modal, closeButton };

export function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

export function Card(book) {
  this.book = book;
}

// the same attributes from the form in the html file

export function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

export function deleteBook(mybook) {
  const bookIndex = myLibrary.indexOf(mybook.target);
  myLibrary.splice(bookIndex, 1);
  console.log(myLibrary);
  saveLibrary();
  mybook.target.offsetParent.parentElement.remove();
}

export function statusChange(status) {
  if (status.target.textContent === "Read") {
    status.target.textContent = "Not Read";
  } else {
    status.target.textContent = "Read";
  }
}

export function checkStatus(book, btn) {
  if (book.read) {
    btn.textContent = "Read";
  } else {
    btn.textContent = "Not Read";
  }
}

export function toggleModal() {
  modal.classList.toggle("show-modal");
}

export function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
