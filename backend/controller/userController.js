import fs from "fs";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

// Utility
import { makeFile, makeFolder, writeLog } from "../utils/makeFileAndFolder.js";

// Database Folder Location
const rootDbFolder = "./db";
const usersDbFolder = "./db/users";
const postsDbFolder = "./db/posts";
const eachUserDbFolder = "./db/users/eachUser";
makeFolder([rootDbFolder, usersDbFolder, postsDbFolder, eachUserDbFolder]);

// Database File Location
const allUsersDbFile = "./db/users/allUsers.json";
const allPostsDbFile = "./db/posts/allPosts.json";
makeFile([allPostsDbFile, allPostsDbFile]);

export const handleUserSignUp = (req, res) => {
  const newUser = req.body;

  // Check For Duplicate Users
  const duplicateUser = findUser(newUser, "signup");

  if (!duplicateUser) {
    const id = v4();
    addUser(newUser, id);
    writeLog("userSignUp", { newUser, id });
    res.status(201).json({ id, message: "Successfully registered" });
  } else {
    let duplicateType;

    if (duplicateUser.username.toLowerCase() === newUser.username.toLowerCase())
      duplicateType = "username";
    else if (duplicateUser.email.toLowerCase() === newUser.email.toLowerCase())
      duplicateType = "email";

    res.status(409).json({
      message: `${duplicateType} has been registered, please use another ${duplicateType}`,
    });
  }
};

export const handleUserSignIn = (req, res) => {
  const user = req.body;
  const takeUser = findUser(user, "signin");

  if (!takeUser) {
    res.status(404).json({
      message: "User is not registered",
    });
  } else {
    const matchPassword = bcrypt.compareSync(user.password, takeUser.password);
    if (matchPassword) {
      writeLog("userSignIn", { takeUser, id: takeUser.id });
      res.status(200).json({
        id: takeUser.id,
        message: "Login successfull",
      });
    } else {
      res.status(401).json({
        message: "Login failed, Password is wrong",
      });
    }
  }
};

export const getDataById = (req, res) => {
  const id = req.params.id;
  const filePath = `${eachUserDbFolder}/${id}.json`;

  // check whether the file exists
  const existFile = fs.existsSync(filePath);

  if (existFile) {
    const data = fs.readFileSync(filePath, "utf-8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(404).json({
      message: "The user database is not available, Please Re-Login",
    });
  }
};

const getAllUsers = () => {
  const allUsers = fs.readFileSync(allUsersDbFile, "utf-8");
  return JSON.parse(allUsers);
};

const findUser = (user, method) => {
  const allUsers = getAllUsers();
  let findUser;

  if (method === "signup") {
    findUser = allUsers.find((aUser) => {
      return (
        user.username.toLowerCase() === aUser.username.toLowerCase() ||
        user.email.toLowerCase() === aUser.email.toLowerCase()
      );
    });
  } else if (method === "signin") {
    findUser = allUsers.find((aUser) => {
      return (
        user.usernameoremail.toLowerCase() === aUser.username.toLowerCase() ||
        user.usernameoremail.toLowerCase() === aUser.email.toLowerCase()
      );
    });
  }

  if (findUser) return findUser;
  else return false;
};

const addUser = (newUser, id) => {
  const { username, email, password } = newUser;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUserValidated = { id, username, email, password: hashedPassword };

  const allUsers = getAllUsers();
  allUsers.push(newUserValidated);
  fs.writeFileSync(allUsersDbFile, JSON.stringify(allUsers), "utf-8");

  makeStandAloneDatabase(newUserValidated);
};

const makeStandAloneDatabase = (user) => {
  const filePath = `${eachUserDbFolder}/${user.id}.json`;
  const newStandAlone = { ...user, path: filePath, posts: [] };
  fs.writeFileSync(filePath, JSON.stringify(newStandAlone), "utf-8");
};
