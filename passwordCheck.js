import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds (should match your environment)

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Hashed Password:", hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

hashPassword('Pass@123');
