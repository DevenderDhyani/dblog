import { Router } from "express";
import { blogData, createBlog, currentUser, home, myPosts, submitBlog, updatePost, updatePostForm } from "../controllers/blogs.js";
import { auth, authR } from "../controllers/controller.js";

const postrout = Router()
postrout.post("/", createBlog)
postrout.post("/home", home)
postrout.post("/submitBlog", authR, submitBlog)
postrout.get("/myposts", authR, myPosts)
postrout.get("/blogData/:authorId",authR, blogData)
postrout.get("/currentUser",authR,currentUser)
postrout.patch('/updatePost/:postId',updatePostForm)
    // .get(authR, updatePostForm)
    // .put(authR, updatePost)   // Handles PUT requests
    // .patch(authR, updatePost); // Handles PATCH requests


export default postrout