
import jwt from 'jsonwebtoken'

const GetJWTtoken = async (userId) => {
    console.log("Entered in jwttoken controller")
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1 day' })
}


export default GetJWTtoken

