import { compareSync } from 'bcrypt';
import path from 'path'
import { fileURLToPath } from 'url';
import prisma from '../prisma/index.js';


export const createBlog = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log("entered into blog")
    res.sendFile(path.join(__dirname, "..", 'dynamic', 'create.html'));
}

export const submitBlog = async (req, res) => {
    const token = req.cookies.token || req.headers['token'] || req.token;
    const user = req.user
    console.log(user)
    const data = req.body;
    console.log(data)
    // Create or update the Post record
    const post = await prisma.post.create({
        data: {
            title: data.title,
            body: data.content,
            author: {
                connect: { id: user.id } // Connect to the user who is the author
            }
        }
    });
    console.log("reached here..........(******)")
    // Update the User's posts field
    await prisma.user.update({
        where: { id: user.id },
        data: {
            posts: {
                connect: { id: post.id } // Add the new post to the user's posts
            }
        }
    });
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log("entered into blog")
    res.sendFile(path.join(__dirname, "..", 'dynamic', 'create.html'));
}

export const myPosts = async (req, res) => {
    console.log("Entered")
    const user = req.user
    const data = await prisma.user.findUnique({
        where: { id: user.id },
        include: { posts: true }
    })
    console.log(data)
    res.json({
        data
    })
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJmNzRkZmY3ZTBjM2U2NmE5ZjY0OCIsImlhdCI6MTcyNjIyMTczMCwiZXhwIjoxNzI2MzA4MTMwfQ.HKIyJGIAwBUOnTC7NkYF3U8spuFBJSyjt0ltulEBGYE
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJmNzRkZmY3ZTBjM2U2NmE5ZjY0OCIsImlhdCI6MTcyNjIyMTczMCwiZXhwIjoxNzI2MzA4MTMwfQ.HKIyJGIAwBUOnTC7NkYF3U8spuFBJSyjt0ltulEBGYE
