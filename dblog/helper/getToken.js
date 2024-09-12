
import jwt from 'jsonwebtoken'

const GetJWTtoken = (userId) => {
    console.log("Entered in jwttoken controller")
    return jwt.sign({ userID: userId }, process.env.JWT_SECRET, { expiresIn: '1 day' })
}

export default GetJWTtoken