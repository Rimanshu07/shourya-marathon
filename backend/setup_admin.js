import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function initAdmin() {
    try {
        let url = process.env.DATABASE_URL;
        if (!url) {
            console.error("No DATABASE_URL found in .env");
            process.exit(1);
        }

        const pool = mysql.createPool(url);

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createTableQuery);
        
        const email = 'admin@shaurya.com';
        const password = 'password123';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (rows.length === 0) {
            await pool.query('INSERT INTO admins (email, password_hash) VALUES (?, ?)', [email, hash]);
            console.log('Default admin created: admin@shaurya.com / password123');
        } else {
            console.log('Default admin already exists.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

initAdmin();
