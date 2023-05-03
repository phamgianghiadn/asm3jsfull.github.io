"use strict";
// tạo class user
class User {
  firstName = null;
  lastName = null;
  username = null;
  password = null;
  pageSize = null;
  category = null;
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "Business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    // làm phần số 9
    this.pageSize = pageSize;
    this.category = category;
  }
  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }
  setCategory(category) {
    this.category = category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
  task = null;
  owner = null;
  isDone = null;
}
