import fs from "fs";

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

export function writeLog(type, data) {
  // type ["userSignUp"]
  // Log Folder
  const rootDbFolder = "./db";
  const logPathFolder = "./db/log";
  makeFolder([rootDbFolder, logPathFolder]);

  // Log File
  const logPathUser = "./db/log/userSignupLog.log";
  makeFile([logPathUser]);
}
