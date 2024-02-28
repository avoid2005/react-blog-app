import fs from "fs";
import { getNow } from "../utils/generateDate.js";

const eachUserDbFolder = "./db/users/eachUser";
const allPostsDbFile = "./db/posts/allPosts.json";

export const editPost = (req, res) => {
  const id = req.params.id;
  const postId = parseInt(req.params.postId);
  const editedPost = req.body;

  console.log(postId);

  const userFilePath = `${eachUserDbFolder}/${id}.json`;
  const userFileContent = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  userFileContent.posts = userFileContent.posts.map((post) => {
    if (post.postId === postId) return editedPost;
    else return post;
  });

  const allPostsContent = getAllPostsAsArray().map((post) => {
    if (post.postId === postId) return editedPost;
    else return post;
  });

  fs.writeFileSync(userFilePath, JSON.stringify(userFileContent), "utf-8");
  fs.writeFileSync(allPostsDbFile, JSON.stringify(allPostsContent), "utf-8");

  res.status(200).json({
    message: "Edit Post Succesfully",
  });
};

export const deletePost = (req, res) => {
  const [id, postId] = [req.params.id, parseInt(req.params.postId)];

  const userFilePath = `${eachUserDbFolder}/${id}.json`;
  const userFileContent = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  userFileContent.posts = userFileContent.posts.filter((post) => {
    return post.postId !== postId;
  });

  const allPostsContent = getAllPostsAsArray().filter((post) => {
    return post.postId !== postId;
  });

  fs.writeFileSync(userFilePath, JSON.stringify(userFileContent), "utf-8");
  fs.writeFileSync(allPostsDbFile, JSON.stringify(allPostsContent), "utf-8");

  res.status(200).json({
    message: "Delete post successfully",
  });
};

export const getPostDetail = (req, res) => {
  const postId = parseInt(req.params.postId);
  const allPosts = getAllPostsAsArray();
  const findPost = allPosts.find((post) => {
    return post.postId === postId;
  });
  res.status(200).json(findPost);
};

export const getAllPosts = (req, res) => {
  const allPosts = fs.readFileSync(allPostsDbFile, "utf-8");
  res.status(200).json(JSON.parse(allPosts));
};

const getAllPostsAsArray = () => {
  const allPosts = fs.readFileSync(allPostsDbFile, "utf-8");
  return JSON.parse(allPosts);
};

export const handleNewPost = (req, res) => {
  const id = req.params.id;
  const allPosts = getAllPostsAsArray();
  const newPost = {
    postId: allPosts.length ? allPosts[0].postId + 1 : 1,
    date: getNow(),
    ...req.body,
  };

  addPostToDatabase(id, newPost);

  res.status(201).json({
    message: "post successfully sent",
  });
};

const addPostToDatabase = (id, newPost) => {
  // add post to user database
  const userDbPath = `${eachUserDbFolder}/${id}.json`;
  const data = JSON.parse(fs.readFileSync(userDbPath, "utf-8"));
  data.posts.unshift(newPost);
  fs.writeFileSync(userDbPath, JSON.stringify(data), "utf-8");

  // add post to global allPosts database
  const allPosts = JSON.parse(fs.readFileSync(allPostsDbFile, "utf-8"));
  allPosts.unshift(newPost);
  fs.writeFileSync(allPostsDbFile, JSON.stringify(allPosts), "utf-8");
};
