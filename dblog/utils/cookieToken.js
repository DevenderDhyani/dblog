import GetJWTtoken from "../helper/getToken.js"
import path from 'path'
import { fileURLToPath } from 'url';
const cookieToken = (user, res) => {
    console.log("token creation")
    const token = GetJWTtoken(user.id)
    console.log("UserId:", user.id)
    console.log("token", token)
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    user.password = undefined
    res.cookie("token",token,options)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "..", 'dynamic', 'profile.html'),{
        user
    });
    // res.status(200).cookie("token", token, options).json({
    //     success: true,
    //     token,
    //     user
    // })
}

export default cookieToken;