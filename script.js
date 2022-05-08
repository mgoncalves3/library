// Book object constructor
// function Book(title, author, pages, status) {
//   (this.title = title), (this.author = author);
//   this.pages = pages;
//   this.status = status;
// }

// // Set a global function for all Book objects
// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages}. Did you read it? ${
//     this.status.toLowerCase().charAt(0).toUpperCase() + this.status.slice(1)
//   }.`;
// };

class Book {
  constructor (title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages}. Did you read it? ${
      this.status.toLowerCase().charAt(0).toUpperCase() + this.status.slice(1)
    }.`;
  }
};

// Array to store the books
let myLibrary = [];

// Selectors
let addBookBtn = document
  .getElementById("new-book-btn")
  .addEventListener("click", toggleModal);
// TODO addConfirmBtn
let addConfirmBtn = document
  .getElementById("add-confirm-btn")
  .addEventListener("click", addBookToLibrary);
let modal = document.getElementById("modal");
let closeModalBtn = document
  .querySelector(".close")
  .addEventListener("click", toggleModal);
let libraryContent = document.getElementById("library-content");

// Opens and closes the form to add a book
function toggleModal() {
  if (modal.style.display == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

// Closes form by clicking outside it
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
// Cache the form inputs
let inputs = document.querySelectorAll("input");

// Creates a new book object and add's it to the library
function addBookToLibrary() {
  let readStatus = document.querySelector("#read-status");

  let newBook = new Book(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value,
    readStatus.value
  );
  myLibrary.push(newBook);
  toggleModal();
  resetForm();
  showLibrary();
}

function createDeleteButton() {
  let newDeleteBtn = document.createElement("button");
  newDeleteBtn.setAttribute("type", "button");
  newDeleteBtn.setAttribute("class", "delete-book-btn");
  newDeleteBtn.innerText = "Delete";
  return newDeleteBtn;
}

function createReadStatusButton() {
  let newReadButton = document.createElement("button");
  newReadButton.setAttribute("type", "button");
  newReadButton.setAttribute("class", "read-status-btn");
  newReadButton.innerText = "Change Read Status";
  return newReadButton;
}

function showLibrary() {
  // Check how many books we have
  let libraryBookCount = myLibrary.length;

  // Check how many we are displaying
  let booksDisplayed = libraryContent.childElementCount;

  // If both nums don't match, display the ones missing
  if (libraryBookCount != booksDisplayed) {
    for (let i = booksDisplayed; i < libraryBookCount; i++) {
      let bookValues = Object.values(myLibrary[i]);
      let newTableRow = document.createElement("tr");
      newTableRow.setAttribute("data-libraryIndex", i);

      bookValues.forEach((value) => {
        let newTableData = document.createElement("td");
        newTableData.innerText = value;

        newTableRow.appendChild(newTableData);
        libraryContent.appendChild(newTableRow);
      });
      // After filling the table with book data, create the delete button
      //  and set a data attribute to identify it inside the myLibrary array
      let newTableReadBtn = document.createElement("td");
      newTableReadBtn.appendChild(createReadStatusButton());
      newTableReadBtn.firstChild.setAttribute("data-libraryIndex", i);
      let newTableDeleteBtn = document.createElement("td");
      newTableDeleteBtn.appendChild(createDeleteButton());
      newTableDeleteBtn.firstChild.setAttribute("data-libraryIndex", i);

      // Add the delete button to the table
      newTableRow.append(newTableReadBtn);
      newTableRow.append(newTableDeleteBtn);
    }
  }
  bindDeleteButtons();
  bindReadButtons();
}

// Resets the input fields
function resetForm() {
  inputs.forEach((input) => {
    input.value = "";
    input.innerText = "";
  });
}

function bindDeleteButtons() {
  let deleteButtons = document.getElementsByClassName("delete-book-btn");

  for (const button of deleteButtons) {
    button.addEventListener("click", deleteBook);
  }
}

function deleteBook(e) {
  let libraryIndex = e.target.getAttribute("data-libraryIndex");
  myLibrary.pop(libraryIndex);
  e.target.parentElement.parentElement.remove();
}

function bindReadButtons() {
  let readButtons = document.getElementsByClassName("read-status-btn");

  for (const button of readButtons) {
    button.addEventListener("click", changeReadingStatus);
  }
}

function changeReadingStatus(e) {
  let libraryIndex = e.target.getAttribute("data-libraryIndex");
  let row = e.target.parentElement.parentElement;
  let currentStatus = row.childNodes[3].innerText;
  let newStatus;
  if (currentStatus == "no") {
    newStatus = "yes";
  } else {
    newStatus = "no";
  }
  myLibrary[libraryIndex].status = newStatus;
  row.childNodes[3].innerText = newStatus;
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "no");
const got = new Book("Game of Thrones", "George R.R. Martin", 864, "no");
const witcher = new Book("The Last Wish", "Andrzej Sapkowski", 304, "yes");
const art = new Book(
  "The Subtle Art Of Not Giving A F*Ck",
  "Mark Manson",
  224,
  "yes"
);

myLibrary.push(hobbit, got);

// Default State
showLibrary();
