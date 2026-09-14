import pool from '../../../config/database.js';

class PaymentModel {
    static async updatePaymentStatus(registrationId, status, orderId, paymentId) {
        const query = `
            UPDATE registrations 
            SET payment_status = ?, razorpay_order_id = ?, razorpay_payment_id = ?
            WHERE id = ?
        `;
        await pool.query(query, [status, orderId, paymentId, registrationId]);
    }
}

export default PaymentModel;
