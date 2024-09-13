import { Router } from "express";
import { createBlog, myPosts, submitBlog } from "../controllers/blogs.js";
import { authR } from "../controllers/controller.js";

const postrout = Router()
postrout.post("/", createBlog)
postrout.post("/submitBlog", authR, submitBlog)
postrout.get("/myposts", authR, myPosts)


export default postrout