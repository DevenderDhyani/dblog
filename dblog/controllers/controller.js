//bring in prisma and cookie

import GetJWTtoken from "../helper/getToken.js";
import jwt from 'jsonwebtoken'
import prisma from "../prisma/index.js"
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";
import path from 'path'
import { fileURLToPath } from 'url';

//get index file
export const indexFile = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "..", 'static', 'index.html'));
}
export const loggedIn = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log("Profile page redirected...")
    res.sendFile(path.join(__dirname, "..", 'dynamic', 'profile.html'));
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
        console.log("After token send back...\n", user)

    } catch (err) {
        console.log(err)
    }
}

export const auth = async (req, res, next) => {
    console.log("entered into login\n")
    const { email, password } = req.body
    console.log(email, password)
    const user = await prisma.user.findUnique({
        where: { email: email },
        include: { posts: true }
    })
    if (!user) {
        console.log("This user does not exist into the database")
        throw new Error()
    }
    const isMatch = await verifyPassword(password, user.password)
    if (!isMatch) {
        console.log("Password is not correct*****")
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        return res.sendFile(path.join(__dirname, "..", 'static', 'login.html'));
    }
    const token = await GetJWTtoken(user.id)
    user.password = undefined
    res.cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    console.log("user form auth:", user)
    req.token = token

    next()
}

//authrization
export const authR = async (req, res, next) => {
    const token = req.cookies.token || req.headers['token'] || req.token;
    console.log("authR : ", token)
    jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
        console.log("inside varifying")
        if (err) {
            console.log("inside error")
            res.send({
                result: "Error occurred while verifying token...."
            });
        } else {
            console.log("inside else")
            console.log(authData.id);  // Ensure this logs the expected user data

            const user = await prisma.user.findUnique({
                where: { id: authData.id },
                include: { posts: true }
            })

            if (user) {
                console.log("inside user passord corrected", req.body.password)
                req.user = user
                next()
                // res.json({
                //     message: "finally data received.",
                //     authData
                // });
                // const __filename = fileURLToPath(import.meta.url);
                // const __dirname = path.dirname(__filename);
                // res.sendFile(path.join(__dirname, "..", 'dynamic', 'profile.html'));
            }
            else {
                console.log("authR : user not found")
                throw new Error("User not found")
            }


        }
    });


}
// 66e2f74dff7e0c3e66a9f648
// 66e2f74dff7e0c3e66a9f648



