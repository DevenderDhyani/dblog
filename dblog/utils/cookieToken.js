import GetJWTtoken from "../helper/getToken.js"
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
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    })
}

export default cookieToken;