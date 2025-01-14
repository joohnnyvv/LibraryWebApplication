import UserManager from "./UserManager";
import SessionManager from "./SessionManager";
import HistoryManager from "./HistoryManager";
import HistoryActions from "../components/ProfilePage/History/Actions/HistoryActionsEnum";
import BookManager from "./BooksManager";

export default class UserBookManager {
  userManager = new UserManager();
  sessionManager = new SessionManager();
  historyManager = new HistoryManager();
  booksManager = new BookManager();
  storageEventKey = "storage";


  #getLoggedUser() { return this.sessionManager.getLoggedUser(); }

  borrowBook(bookId, userId) {
    const user = this.userManager.getUserBy(userId);
    user.borrowed_books.push(bookId);
    this.#updateOtherUser(user);
    this.historyManager.logHistory(HistoryActions.Borrow, bookId, user);
    this.cancelReservation(bookId, user, false);
  }

  async reserviseBook(bookId) {
    return new Promise((resolve, reject) => {
      const user = this.#getLoggedUser();
      user.reserved_books.push(bookId);
      this.#updateUser(user);
      this.historyManager.logHistory(HistoryActions.Reserve, bookId, user);
      resolve();
    });
  }


  returnBook(bookId, userId) {
    const user = this.userManager.getUserBy(userId);
    const index = user.borrowed_books.findIndex((borrowedBookId) => borrowedBookId == bookId);
    if (index > -1) {
      user.borrowed_books.splice(index, 1);
    }
    this.#updateOtherUser(user);
    this.historyManager.logHistory(HistoryActions.Return, bookId, user);
  }

  cancelReservation(bookId, user = this.#getLoggedUser(), shouldLogHistory = true) {
    const index = user.reserved_books.findIndex((reservedBookId) => reservedBookId == bookId);
    if (index > -1) {
      user.reserved_books.splice(index, 1);
    }
    this.#updateOtherUser(user);
    if (shouldLogHistory) {
      this.historyManager.logHistory(HistoryActions.CancelReservation, bookId, user);
    }
  }

  getAllBorrowedBooks() {
    return this.booksManager.getBooks().filter(book => this.#getLoggedUser().borrowed_books.includes(book.isbn13));
  }

  getBorrowedBooksOf(user) {
    return this.booksManager.getBooks().filter(book => user.borrowed_books.includes(book.isbn13));
  }

  getAllReservedBooks() {
    return this.booksManager.getBooks().filter(book => this.#getLoggedUser().reserved_books.includes(book.isbn13));
  }

  isReserved(bookId) {
    return this.#getLoggedUser().reserved_books.includes(bookId);
  }

  isBorrowed(bookId) {
    return this.#getLoggedUser().borrowed_books.includes(bookId);
  }

  #updateUser(user) {
    this.userManager.updateUser(user);
    this.sessionManager.updateLoggedUser(user);
    window.dispatchEvent(new Event(this.storageEventKey));
  }

  #updateOtherUser(user) {
    const currentUser = this.#getLoggedUser();
    this.userManager.updateUser(user);
    if (currentUser.id === user.id) {
      this.sessionManager.updateLoggedUser(user);
    }
    window.dispatchEvent(new Event(this.storageEventKey));
  }

  setOnBookChangeListener(onChange) {
    window.addEventListener(this.storageEventKey, (storageEvent) => {
      onChange();
    });
  }
}