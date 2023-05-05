import UserManager from "../components/AdminPanel/utils/UserManager";
import HistoryObject from "../components/ProfilePage/history/HistoryObject";
import LocalStorageKeys from "./LocalStorageKeys";
import SessionManager from "./SessionManager";

export default class HistoryManager {
    userManager = new UserManager();
    sessionManager = new SessionManager();
    userHistoryEventKey = "historyUserStorage";
    globalHistoryKey = LocalStorageKeys.globalHistory;

    #getUser() { return this.sessionManager.getLoggedUser(); }

    getGlobalHistory() {
        const history = JSON.parse(localStorage.getItem(this.globalHistoryKey));
        if (history === null)
            return [];
        else
            return history;
    }

    logHistory(historyAction, bookId, user) {
        const globalHistoryNextIndex = this.getGlobalHistory().length;
        const userHistoryNextIndex = user.history.length;
        this.#saveUserHistory(new HistoryObject(userHistoryNextIndex, historyAction, bookId, user));
        this.#saveGlobalHistory(new HistoryObject(globalHistoryNextIndex, historyAction, bookId, user));
    }

    #saveUserHistory(historyObject) {
        let user = this.#getUser();
        user.history.push(historyObject);
        this.#updateUser(user);
    }

    #saveGlobalHistory(historyObject) {
        let history = this.getGlobalHistory();
        history.push(historyObject);
        localStorage.setItem(this.globalHistoryKey, JSON.stringify(history));
    }

    #updateUser(user) {
        this.userManager.updateUser(user);
        this.sessionManager.updateLoggedUser(user);
        window.dispatchEvent(new Event(this.userHistoryEventKey));
    }

    setOnUserHistoryChangedListener(onChange) {
        window.addEventListener(this.userHistoryEventKey, (storageEvent) => {
            onChange();
        });
    }
}