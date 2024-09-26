import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer"; 
import con from '../utils/db.js';

const otpRouter = express.Router();

// Function to generate OTP
const generateOtp = () => {
    return crypto.randomInt(1000, 10000).toString(); 
};

// Function to send OTP via email (You need to configure transporter)
const sendOtpEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // yahoo, outlook etc
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    });
};

// Endpoint to send OTP
otpRouter.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = generateOtp();

    // Save OTP to the database with expiration time
    const insertOtpQuery = "INSERT INTO otp_table (email, otp, expiresAt) VALUES (?, ?, ?)";
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP is only valid for 15 minutes

    con.query(insertOtpQuery, [email, otp, expiresAt], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving OTP' });
        }

        try {
            await sendOtpEmail(email, otp);
            return res.status(200).json({ message: 'OTP sent to email' });
        } catch (emailErr) {
            return res.status(500).json({ error: 'Error sending OTP email' });
        }
    });
});

otpRouter.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Check OTP validity
    const selectOtpQuery = "SELECT * FROM otp_table WHERE email = ? AND otp = ? AND expiresAt > ?";
    con.query(selectOtpQuery, [email, otp, new Date()], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching OTP' });
        }

        if (result.length > 0) {
            // OTP is valid, allow login
            const token = jwt.sign(
                { role: "user", email: email },
                process.env.JWT_SECRET, // Use a secure secret key
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.status(200).json({ loginStatus: true, token });
        } else {
            return res.status(400).json({ loginStatus: false, error: 'Invalid or expired OTP' });
        }
    });
});

export { otpRouter };

