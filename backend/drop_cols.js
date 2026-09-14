import mysql from 'mysql2/promise';

async function main() {
    const connection = await mysql.createConnection("mysql://root:8959735199@localhost:3306/shaurya_marathon");
    try {
        await connection.query("ALTER TABLE registrations DROP COLUMN pan_card, DROP COLUMN marksheet, DROP COLUMN emergency_contact;");
        console.log("Columns dropped successfully");
    } catch(e) {
        console.error("Error dropping columns:", e.message);
    }
    await connection.end();
}
main();
