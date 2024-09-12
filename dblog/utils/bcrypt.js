import bcrypt from 'bcrypt';

// Hash a password
export const hashPassword = async (plainTextPassword) => {
    const saltRounds = 10;  // The higher the saltRounds, the more secure, but slower it becomes
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
};

//varifying password
export const verifyPassword = async (plainTextPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};







