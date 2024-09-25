import express from "express";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import con from '../utils/db.js'; // database connection

const userLoginRouter = express.Router();
dotenv.config();

userLoginRouter.post('/user-login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ loginStatus: false, Error: "Email and password are required" });
    }

    const sql = "SELECT * FROM usersignup WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ loginStatus: false, Error: "Database query error" });

        if (result.length > 0) {
            const storedPassword = result[0].password;
            const isPasswordValid = bcrypt.compareSync(password, storedPassword); // Compare hashed password

            if (isPasswordValid) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "user", email: email },
                    process.env.JWT_SECRET, // Use a secure secret key
                    { expiresIn: '1d' } 
                );
                console.log("Generated JWT Token: ", token);
                res.cookie('token', token);
                return res.json({ loginStatus: true, token }); 
            } else {
                return res.status(400).json({ loginStatus: false, Error: "Invalid password" });
            }
        } else {
            return res.status(400).json({ loginStatus: false, Error: "Invalid email or password" });
        }
    });
});

export { userLoginRouter };
