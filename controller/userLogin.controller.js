import Signup from "../modals/signup.modal.js";  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Handle user login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ loginStatus: false, Error: "Email and password are required" });
    }

    try {
        // Find the user by email in MongoDB
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(401).json({ loginStatus: false, Error: "Invalid email or password" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ loginStatus: false, Error: "Invalid email or password" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id, role: "user" }, JWT_SECRET, { expiresIn: '1d' });

        // Send token in response
        return res.status(200).json({ loginStatus: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ loginStatus: false, Error: "Internal server error" });
    }
};
