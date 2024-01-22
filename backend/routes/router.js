import { Router } from "express"
import { clearAllData } from "../controller/clear.js"
import {
  handleUserSignUp,
  handleUserSignIn,
  getDataById,
} from "../controller/userController.js"
import {
  handleNewPost,
  getAllPosts,
  getPostDetail,
  editPost,
  deletePost,
} from "../controller/postController.js"

export const router = Router()

router.get("/api/clear", clearAllData)
router.post("/api/users/signup", handleUserSignUp)
router.post("/api/users/signin", handleUserSignIn)
router.get("/api/users/data/:id", getDataById)
router.post("/api/users/newpost/:id", handleNewPost)
router.get("/api/allposts/:postId", getPostDetail)
router.get("/api/allposts", getAllPosts)
router.put("/api/edit/:id/:postId", editPost)
router.delete("/api/delete/:id/:postId", deletePost)
