class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book)
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    toggleReadStatus(index) {
        this.books[index].read = !this.books[index].read;
    }

    getBooks() {
        return this.books;
    }
}

const myLibrary = new Library();

function displayBooks() {
    const libraryContainer = document.querySelector('.library');
    libraryContainer.textContent = '';

    myLibrary.forEach((book, index) => {
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

        const changeReadStatusButton = document.createElement('button');
        changeReadStatusButton.textContent = book.read ? "Mark Unread" : "Mark Read";
        changeReadStatusButton.classList.add('change-read-status-button');
        changeReadStatusButton.addEventListener("click", () => {
            toggleReadStatus(index);
        });
        bookCard.appendChild(changeReadStatusButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(index);
        });
        bookCard.appendChild(removeButton);

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

myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, true)); 
myLibrary.addBook(new Book("1984", "George Orwell", 328, false));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", 279, true));
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));
myLibrary.addBook(new Book("Moby-Dick", "Herman Melville", 585, true));
myLibrary.addBook(new Book("War and Peace", "Leo Tolstoy", 1225, false));

displayBooks();