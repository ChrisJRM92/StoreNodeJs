const User = require("../../models/User");

async function createUser(){
  const user = {
    firstName: "Leonel",
    lastName: "Mesi",
    email: "leo@mail.com",
    password: "leo12345",
    phone: "+59362937357"
  }

  await User.create(user)
}

module.exports = createUser;