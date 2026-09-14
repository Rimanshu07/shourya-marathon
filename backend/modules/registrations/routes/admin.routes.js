import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../../config/database.js';
import RegistrationController from '../controllers/registration.controller.js';

const router = express.Router();

router.get('/registrations', RegistrationController.getAllRegistrations);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required' });
        }

        const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Return a simple success flag and token
        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });

        res.json({
            success: true,
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
