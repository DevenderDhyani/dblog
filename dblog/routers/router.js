import { Router } from "express";
import { auth, authR, indexFile, loggedIn, signup } from "../controllers/controller.js";

const rout = Router()

rout.get("/", indexFile)
rout.post("/signup", signup)
rout.post("/login", auth, authR, loggedIn)

export default rout