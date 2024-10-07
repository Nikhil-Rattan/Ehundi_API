// import express from "express"
// import con from '../utils/db.js'
// import jwt from 'jsonwebtoken'

// const router = express.Router()

// router.post('/admin-login', (req, res) => {
//     const sql = "SELECT * from admin where email = ? and password = ?"
//     con.query(sql, [req.body.email, req.body.password],
//         (err, result) => {
//             if (err) return res.json({ loginStatus: false, Error: "Query error" })
//             if (result.length > 0) {
//                 const email = result[0].email;
//                 const token = jwt.sign(
//                     { role: "admin", email: email },
//                     "heart",
//                     { expiresIn: '1d' }
//                 );
//                 console.log("Generated JWT Token: ", token);
//                 res.cookie('token', token)
//                 return res.json({ loginStatus: true })
//             }
//             else {
//                 return res.json({ loginStatus: false, Error: "Invalid email or password" })
//             }
//         });
// });


// export { router as adminRouter };

import express from "express";
import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign(
                { role: "admin", email: user.email },
                "secretKey", // Replace with a secure secret key
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            res.json({ loginStatus: true });
        } else {
            res.json({ loginStatus: false, Error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ loginStatus: false, Error: "Database error" });
    }
});

export { router as adminRouter };
