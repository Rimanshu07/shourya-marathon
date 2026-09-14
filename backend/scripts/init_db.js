import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function initDB() {
    try {
        let url = process.env.DATABASE_URL;
        if (!url) {
            console.error("No DATABASE_URL found in .env");
            process.exit(1);
        }

        // Connect without the database name to create it
        const urlObj = new URL(url);
        const dbName = urlObj.pathname.replace('/', '');
        
        // Remove pathname to connect to MySQL globally
        urlObj.pathname = '/';
        const globalUrl = urlObj.toString();

        console.log(`Connecting to MySQL server...`);
        const connection = await mysql.createConnection(globalUrl);

        console.log(`Creating database '${dbName}' if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

        console.log(`Switching to database '${dbName}'...`);
        await connection.query(`USE \`${dbName}\``);

        console.log(`Creating 'registrations' table...`);
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS registrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            father_name VARCHAR(150) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            dob DATE NOT NULL,
            gender VARCHAR(20) NOT NULL,
            state VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            pan_card VARCHAR(20) NOT NULL,
            marksheet VARCHAR(100) NOT NULL,
            emergency_contact VARCHAR(20) NOT NULL,
            category VARCHAR(50) NOT NULL,
            photo_url VARCHAR(255) NULL,
            proof_of_age_url VARCHAR(255) NULL,
            payment_status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
            razorpay_order_id VARCHAR(100) NULL,
            razorpay_payment_id VARCHAR(100) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `;
        await connection.query('DROP TABLE IF EXISTS registrations');
        await connection.query(createTableQuery);

        console.log("Database and tables initialized successfully!");
        await connection.end();
        process.exit(0);

    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
}

initDB();
