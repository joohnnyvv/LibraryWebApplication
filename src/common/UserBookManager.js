import UserManager from "../components/AdminPanel/utils/UserManager";
import SessionManager from "./SessionManager";
import allBooks from "../models/books.json"

export default class UserBookManager {
    userManager = new UserManager();
    sessionManager = new SessionManager();
    user = this.sessionManager.getLoggedUser();
    storageEventKey = "storage"

    borrowBook(bookId) {
        this.user.borrowed_books.push(bookId);
        this.#updateUser();
    }

    reserviseBook(bookId) {
        this.user.reserved_books.push(bookId);
        this.#updateUser();
    }

    returnBook(bookId) {
        const index = this.user.borrowed_books.findIndex((borrowedBookId) => borrowedBookId == bookId);
        if (index > -1) {
            this.user.borrowed_books.splice(index, 1);
        }
        this.#updateUser();
    }

    cancelReservation(bookId) {
        const index = this.user.reserved_books.findIndex((reservedBookId) => reservedBookId == bookId);
        if (index > -1) {
            this.user.reserved_books.splice(index, 1);
        }
        this.#updateUser();
    }

    getAllBorrowedBooks() {
        const userBorrowedBooks = allBooks.filter(book => this.user.borrowed_books.includes(book.isbn13));
        return userBorrowedBooks;
    }

    getAllReservedBooks() {
        const userReservedBooks = allBooks.filter(book => this.user.reserved_books.includes(book.isbn13));
        return userReservedBooks;
    }

    #updateUser() {
        this.userManager.updateUser(this.user);
        this.sessionManager.updateLoggedUser(this.user);
        window.dispatchEvent(new Event(this.storageEventKey));
    }
}