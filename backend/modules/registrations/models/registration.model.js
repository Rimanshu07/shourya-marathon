import pool from '../../../config/database.js';

class RegistrationModel {
    static async create(data) {
        const query = `
            INSERT INTO registrations (
                name, father_name, email, phone, dob, gender, state, city, 
                category, photo_url, proof_of_age_url, payment_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')
        `;
        const values = [
            data.name,
            data.father_name,
            data.email,
            data.phone,
            data.dob,
            data.gender,
            data.state,
            data.city,
            data.category,
            data.photo_url || null,
            data.proof_of_age_url || null
        ];
        
        const [result] = await pool.query(query, values);
        return result.insertId;
    }

    static async findAll() {
        const query = `SELECT * FROM registrations ORDER BY created_at DESC`;
        const [rows] = await pool.query(query);
        return rows;
    }

    static async findById(id) {
        const query = `SELECT * FROM registrations WHERE id = ?`;
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }
}

export default RegistrationModel;
