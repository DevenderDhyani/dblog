import { Router } from "express";
import { indexFile, login, signup } from "../controllers/controller.js";

const rout = Router()

rout.get("/", indexFile)
rout.post("/signup", signup)
rout.post("/login", login)

export default rout