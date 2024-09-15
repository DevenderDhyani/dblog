import prisma from '../prisma/index.js';



export const allPosts = async (req, res) => {
    console.log("Entered")
    const user = req.user
    const data = await prisma.post.findMany()
    console.log(data)
    return res.json({
        data
    })
}





