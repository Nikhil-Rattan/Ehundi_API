import express from "express";
import bcrypt from 'bcrypt';
import con from '../utils/db.js';

const signupRouter = express.Router();

signupRouter.post('/signup', (req, res) => {
    const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // if email already exists
    const emailCheckQuery = "SELECT * FROM usersignup WHERE email = ?";
    con.query(emailCheckQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const insertQuery = "INSERT INTO usersignup (fullName, email, phoneNumber, password) VALUES (?, ?, ?, ?)";
        
        con.query(insertQuery, [fullName, email, phoneNumber, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting user data' });
            }
            return res.status(201).json({ success: 'User registered successfully' });
        });
    });
});



export { signupRouter };
