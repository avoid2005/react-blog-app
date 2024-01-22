import fs from "fs"

export const clearAllData = (req, res) => {
  fs.rmSync("./db", { recursive: true })
  const rootDbFolder = "./db"
  const usersDbFolder = "./db/users"
  const postsDbFolder = "./db/posts"
  const eachUserDbFolder = "./db/users/eachUser"
  const allUsersDbFile = "./db/users/allUsers.json"
  const allPostsDbFile = "./db/posts/allPosts.json"
  if (!fs.existsSync(rootDbFolder)) fs.mkdirSync(rootDbFolder)
  if (!fs.existsSync(usersDbFolder)) fs.mkdirSync(usersDbFolder)
  if (!fs.existsSync(postsDbFolder)) fs.mkdirSync(postsDbFolder)
  if (!fs.existsSync(eachUserDbFolder)) fs.mkdirSync(eachUserDbFolder)
  if (!fs.existsSync(allUsersDbFile))
    fs.writeFileSync(allUsersDbFile, "[]", "utf-8")
  if (!fs.existsSync(allPostsDbFile))
    fs.writeFileSync(allPostsDbFile, "[]", "utf-8")
  res.json({
    status: 200,
    message: "Database Remove Successfully",
  })
}
