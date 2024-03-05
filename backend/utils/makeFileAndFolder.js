import fs from "fs";
import { getNow } from "./generateDate.js";
import { userSignUpFormat, userSignInFormat } from "./formatLog.js";

export function makeFolder(folders) {
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  });
}

export function makeFile(files) {
  files.forEach((file) => {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf-8");
  });
}

function addToLog(targetFile, content) {
  if (fs.readFileSync(targetFile, "utf-8") === "[]") {
    fs.writeFileSync(targetFile, "|" + content, "utf-8");
    return;
  }
  const newData = fs.readFileSync(targetFile, "utf-8").split("|");
  newData.push(content);
  fs.writeFileSync(targetFile, newData.join("|"), "utf-8");
}

export function writeLog(type, data) {
  // Log Folder
  const rootDbFolder = "./db";
  const logPathFolder = "./db/log";
  makeFolder([rootDbFolder, logPathFolder]);

  // Log File
  // type ["userSignUp", "userSignIn"]
  const logFileName = ["userSignUpLog.log", "userSignInLog.log"];
  const logPathUser = logFileName.map((file) => logPathFolder + "/" + file);
  makeFile(logPathUser);

  // Lets Write To Log
  logPathUser.forEach((filename) => {
    const expectedFile = filename.split("/");
    if (
      expectedFile[expectedFile.length - 1] === "userSignUpLog.log" &&
      type === "userSignUp"
    ) {
      const signUpTime = getNow();
      const { newUser, id } = data;
      const format = userSignUpFormat({
        signUpTime,
        id,
        username: newUser.username,
        email: newUser.email,
      });
      addToLog(filename, format);
    }
    if (
      expectedFile[expectedFile.length - 1] === "userSignInLog.log" &&
      type === "userSignIn"
    ) {
      const signInTime = getNow();
      const { takeUser, id } = data;
      const format = userSignInFormat({
        signInTime,
        id,
        username: takeUser.username,
        email: takeUser.email,
      });
      addToLog(filename, format);
    }
  });
}
