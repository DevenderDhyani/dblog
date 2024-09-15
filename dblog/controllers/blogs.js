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
export const home = (req,res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log("entered into blog")
    res.sendFile(path.join(__dirname, "..", 'dynamic', 'profile.html'));
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
export const updatePostForm = async (req, res) => {
    const postId = req.query.postId || req.params.postId
    console.log("Its my post: ",postId)
    const content = req.body.body
    console.log("body: ",content)
    const user = await prisma.post.update({
        where:{id:postId},
        data:{body:content}
    })
    res.json({ 
        postId
    })
}
export const updatePost = async (req, res) => {
    const parameters = req.params
    console.log("This is my postId: ",parameters)
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // console.log("entered into blog")
    // res.sendFile(path.join(__dirname, "..", 'dynamic', 'profile.html'));
}



export const blogData = async(req,res) => {
    console.log("Recived blog request...")
    const id = req.params.authorId || req.cookies.token
    const user =   await prisma.user.findUnique({
        where: {id:id},
        include:{posts:true}
    })
    console.log("blog data :",user)
    return res.json(user)
}
export const currentUser = async (req,res) => {
    const user = req.user
    console.log(user)
    return res.json({user})
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJmNzRkZmY3ZTBjM2U2NmE5ZjY0OCIsImlhdCI6MTcyNjIyMTczMCwiZXhwIjoxNzI2MzA4MTMwfQ.HKIyJGIAwBUOnTC7NkYF3U8spuFBJSyjt0ltulEBGYE
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJmNzRkZmY3ZTBjM2U2NmE5ZjY0OCIsImlhdCI6MTcyNjIyMTczMCwiZXhwIjoxNzI2MzA4MTMwfQ.HKIyJGIAwBUOnTC7NkYF3U8spuFBJSyjt0ltulEBGYE
