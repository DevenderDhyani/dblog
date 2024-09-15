import { Router } from "express";
import { auth, authR, indexFile, loggedIn, logout, signup } from "../controllers/controller.js";

const rout = Router()

rout.get("/", indexFile)
rout.post("/signup", signup)
rout.post("/login", auth, authR, loggedIn)
rout.post("/logout",logout)

export default rout