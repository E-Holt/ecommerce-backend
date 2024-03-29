const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../../models/user")
const Admin = require("../../models/admin")

async function registerUser(user) {
  const existingUser = await User.findOne({ username: user.username })
  if(existingUser) {
    return { error: "Username already exists" }
  }
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const userCreated = await User.create({
    name: user.name,
    username: user.username,
    password: hashedPassword
  })
  const payload = {
    id: userCreated._id
  }
  const token = jwt.sign(payload, "secret")
  return token
}

async function loginUser(user) {
  //check if username exists
  const existingUser = await User.findOne({ username: user.username })
  if(!existingUser) {
    return { error: "Username or password is incorrect"}
  }
  //match the password
  const isMatch = await bcrypt.compare(user.password, existingUser.password)
  if(!isMatch) {
    return { error: "Username or password is incorrect" }
  }
  //create the token
  const payload = {
    id: existingUser._id
  }
  const token = jwt.sign(payload, "secret")
  //return the token
  return token
}

async function loginAdmin(user) {
    //check if username exists
    const existingUser = await Admin.findOne({ username: user.username })
    if(!existingUser) {
      return { error: "Username or password is incorrect"}
    }
    //match the password
    const isMatch = await bcrypt.compare(user.password, existingUser.password)
    if(!isMatch) {
      return { error: "Username or password is incorrect" }
    }
    //create the token
    const payload = {
      id: existingUser._id,
      is_admin: true,
    }
    const token = jwt.sign(payload, "secret")
    //return the token
    return token
}

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
}
