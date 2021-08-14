import bcrypt from 'bcryptjs'

// test users

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    // use bcrypt to hash the password synchronously (for testing only)
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
