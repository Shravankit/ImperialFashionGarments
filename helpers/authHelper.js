import bcrypt from "bcrypt";

export const hashPassword  = async (password) => {
    try {
        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}