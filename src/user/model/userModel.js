export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static signUp(user) {
    let newUser = new UserModel(
      users.length + 1,
      user.name,
      user.email,
      user.password,
      user.type
    );

    users.push(newUser);
  }
  static login(email, password) {
    let user = users.find(
      (target) => target.email === email && target.password === password
    );
    return user; // Return the user object or undefined
  }

  static getALL() {
    return users;
  }
}
let users = [
  {
    id: 1,
    name: "user",
    email: "user@gmail.com",
    password: "password123",
    type: "customer",
  },
];
