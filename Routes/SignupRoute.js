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

// For get the list of registered user's
signupRouter.get('/users', (req, res) => {
    const getAllUsersQuery = "SELECT * FROM usersignup";
    con.query(getAllUsersQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching users' });
        }
        return res.status(200).json(result);
    });
});

// To get a specific user by ID
signupRouter.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const getUserByIdQuery = "SELECT * FROM usersignup WHERE userId = ?";
    con.query(getUserByIdQuery, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(result[0]);
    });
});

// Update user information
signupRouter.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { fullName, email, phoneNumber, password } = req.body;

    // Update only if fields are provided
    const updateQuery = `
        UPDATE usersignup 
        SET fullName = COALESCE(?, fullName), 
            email = COALESCE(?, email), 
            phoneNumber = COALESCE(?, phoneNumber), 
            password = COALESCE(?, password)
        WHERE userId = ?`;

        // Hash the password only if it's provided
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    con.query(updateQuery, [fullName, email, phoneNumber, hashedPassword, userId], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: 'Error updating user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ success: 'User updated successfully' });
    });
});

signupRouter.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const deleteQuery = "DELETE FROM usersignup WHERE id = ?";
    con.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ success: 'User deleted successfully' });
    });
});



export { signupRouter };
