import LocalStorageKeys from "./LocalStorageKeys";

export default class UserManager {
  userListKey = LocalStorageKeys.userList;
  storageEventKey = "storage";

  getUsers() {
    return JSON.parse(localStorage.getItem(this.userListKey));
  }

  getUserBy(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  removeUser(userToRemove) {
    var users = this.getUsers();
    const index = users.findIndex((user) => user.id === userToRemove.id);
    if (index > -1) {
      users.splice(index, 1);
    }
    localStorage.setItem(this.userListKey, JSON.stringify(users));
    window.dispatchEvent(new Event(this.storageEventKey));
  }

  addUser(name, surname, login, password, role) {
    var users = this.getUsers();
    var lastIndex = 0;
    if (users.length === 0) {
      users = [];
    } else {
      lastIndex = users[users.length - 1].id + 1;
    }
    users.push({
      id: lastIndex,
      name: name,
      surname: surname,
      login: login,
      password: password,
      role: role,
      reserved_books: [],
      history: [],
      borrowed_books: [],
    });
    localStorage.setItem(this.userListKey, JSON.stringify(users));
    window.dispatchEvent(new Event(this.storageEventKey));
  }

  updateUserPersonalInfo(id, name, surname, login, password, role) {
    var users = this.getUsers();
    const index = users.findIndex((userEl) => userEl.id == id);
    if (index > -1) {
      users[index].name = name;
      users[index].surname = surname;
      users[index].login = login;
      users[index].password = password;
      users[index].role = role;
    }
    localStorage.setItem(this.userListKey, JSON.stringify(users));
    window.dispatchEvent(new Event("storage"));
  }

  updateUser(user) {
    var users = this.getUsers();
    const index = users.findIndex((userEl) => userEl.id == user.id);
    if (index > -1) {
      users[index] = user;
    }
    localStorage.setItem(this.userListKey, JSON.stringify(users));
    window.dispatchEvent(new Event("storage"));
  }
}
