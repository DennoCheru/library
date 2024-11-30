const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    };
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

function displayBooks() {
    const libraryContainer = document.querySelector('.library');
    libraryContainer.textContent = '';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = `Title: ${book.title}`;
        bookCard.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        bookCard.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages} pages`;
        bookCard.appendChild(pagesElement);

        const readElement = document.createElement('p');
        readElement.textContent = `Read: ${book.read ? "Read" : "Not Read"}`;
        bookCard.appendChild(readElement);

        libraryContainer.appendChild(bookCard);
    });
}

const modal = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookButton");
const closeButton = document.querySelector(".close-button");
const newBookForm = document.querySelector("#newBookForm");

newBookButton.addEventListener("click", () => {
    modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title,author,pages,read);
    displayBooks();
    modal.style.display = "none";
});

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true); 
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Moby-Dick", "Herman Melville", 585, true);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);

displayBooks();