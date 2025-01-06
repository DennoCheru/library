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
        this.books.push(book);
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

class DisplayController {
    constructor(library) {
        this.library = library;
        this.libraryContainer = document.querySelector(`.library`);
        this.modal = document.querySelector('#newBookModal');
        this.newBookButton = document.querySelector('#newBookButton');
        this.closeButton = document.querySelector('.close-button');
        this.newBookForm = document.querySelector('#newBookForm');

        this.initEventListerners();
    }

    initEventListerners() {
        this.newBookButton.addEventListener("click", () => {
            this.modal.style.display = "block";
        });

        this.closeButton.addEventListener("click", () => {
            this.modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = "none";
            }
        });

        this.newBookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addBookFromForm();
        });
    }

    addBookFromForm() {
        if (!this.validateForm()) {
            return;
        }

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const read = document.querySelector('#read').checked;

        const newBook = new Book(title, author, pages, read);
        this.library.addBook(newBook);

        this.displayBooks();
        this.modal.style.display = "none";
    }

    displayBooks() {
        this.libraryContainer.textContent = '';

        this.library.getBooks().forEach((book, index) => {
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
                this.library.toggleReadStatus(index);
                this.displayBooks();
            });
            bookCard.appendChild(changeReadStatusButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener("click", () => {
                this.library.removeBook(index);
                this.displayBooks();
            });
            bookCard.appendChild(removeButton);

            this.libraryContainer.appendChild(bookCard);
        });
    }

    validateForm() {
        const title = document.querySelector('#title').value.trim();
        const author = document.querySelector('#author').value.trim();
        const pages = document.querySelector('#pages').value.trim();

        let isValid = true;

        document.querySelectorAll('.error-message').forEach(el => el.remove());

        if (!title) {
            this.showError('#title', 'Title is required');
            isValid = false;
        }

        if (!author) {
            this.showError('#author', 'Author is required');
            isValid = false;
        }

        if (!pages || isNaN(pages) || Number(pages) <= 0 || !Number.isInteger(Number(pages))) {
            this.showError('#pages', 'Please enter a valid number of pages');
            isValid = false;
        }

        return isValid;
    }

    showError(inputSelector, message) {
        const inputElement = document.querySelector(inputSelector);
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
}

const myLibrary = new Library();

const displayController = new DisplayController(myLibrary);

myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, true)); 
myLibrary.addBook(new Book("1984", "George Orwell", 328, false));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", 279, true));
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));
myLibrary.addBook(new Book("Moby-Dick", "Herman Melville", 585, true));
myLibrary.addBook(new Book("War and Peace", "Leo Tolstoy", 1225, false));

displayController.displayBooks();