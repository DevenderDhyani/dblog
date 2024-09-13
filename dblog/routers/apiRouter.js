import { Router } from "express";
import { allPosts } from "../controllers/api.js";


const apiRout = Router()


apiRout.get("/allPosts", allPosts)


export default apiRout