//bring in prisma and cookie

import prisma from "../prisma/index.js"
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";
import cookieToken from "../utils/cookieToken.js"
import path from 'path'
import { fileURLToPath } from 'url';

//get index file
export const indexFile = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "..", 'static', 'index.html'));
}

//user sign up
export const signup = async (req, res, next) => {
    try {
        let { name, email, password } = req.body
        console.log("Entered into controller")
        //check
        if (!name || !email || !password) {
            throw new Error("Please provide all fields")
        }

        password = await hashPassword(password)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })
        //send user a token
        cookieToken(user, res)
        console.log("After token send back...\n", user)

    } catch (err) {
        console.log(err)
    }
}

export const login = async (req, res) => {
    console.log("entered into login\n")
    const { email, password } = req.body
    console.log(email, password)

    const user = await prisma.user.findUnique({
        where: { email: email },
    })
    if (!user) {
        console.log("there is no user whith email id", email)
    }
    else if (await varifyPassword(password, user.password)) {
        console.log("wrong password")
    } else {
        console.log("User has been found in the data base")
    }
}


