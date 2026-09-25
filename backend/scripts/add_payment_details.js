import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const columns = [
    ['payment_method', 'VARCHAR(30) NULL'],
    ['payment_bank', 'VARCHAR(100) NULL'],
    ['payment_wallet', 'VARCHAR(50) NULL'],
    ['payment_vpa', 'VARCHAR(150) NULL'],
    ['payment_card_network', 'VARCHAR(30) NULL'],
    ['payment_card_type', 'VARCHAR(30) NULL'],
    ['payment_card_last4', 'VARCHAR(10) NULL'],
    ['payment_issuer', 'VARCHAR(100) NULL'],
    ['payment_currency', 'VARCHAR(10) NULL'],
    ['payment_amount', 'INT NULL']
];

async function addPaymentDetails() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    try {
        for (const [name, definition] of columns) {
            const [existing] = await connection.query(
                'SHOW COLUMNS FROM registrations LIKE ?',
                [name]
            );
            if (existing.length === 0) {
                await connection.query(`ALTER TABLE registrations ADD COLUMN ${name} ${definition}`);
            }
        }
        console.log('Payment detail columns are ready.');
    } finally {
        await connection.end();
    }
}

addPaymentDetails().catch((error) => {
    console.error('Error adding payment detail columns:', error);
    process.exitCode = 1;
});
