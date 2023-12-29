const bcrypt = require('bcryptjs')

const users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: 's1234',
      isAdmin: true
    },
    {
      firstName: "Jane ",
      lastName: "Smith",
      email: "janesmith@example.com",
      password: 's1234',
      isAdmin: false
    },
    {
      firstName: "Alice ",
      lastName: "Johnson",
      email: "alicejohnson@example.com",
      password: 's1234',
      isAdmin: false
    },
    {
      firstName: "Bob",
      lastName: "Thompson",
      email: "bobthompson@example.com",
      password: 's1234',
      isAdmin: false
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charliebrown@example.com",
      password: 's1234',
      isAdmin: false
    }
  ];
  
  module.exports = users;