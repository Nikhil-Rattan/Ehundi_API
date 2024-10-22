import bcrypt from 'bcrypt';


async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log("Password matches:", isMatch);
    } catch (error) {
        console.error('Error verifying password:', error);
    }
}

// Replace with actual hashed password from your DB
const storedHashedPassword = '$2b$10$y.EMIVaFQ/IlKLkaEbVzl.NqFMtEN3ZbZ3a7cmR1J2.g6nDFftcuG'; 

verifyPassword('Pass@123', storedHashedPassword);
