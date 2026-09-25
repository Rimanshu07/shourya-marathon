import pool from '../../../config/database.js';

class PaymentModel {
    static async updatePaymentStatus(registrationId, status, orderId, paymentId, details = {}) {
        const query = `
            UPDATE registrations 
            SET payment_status = ?, razorpay_order_id = ?, razorpay_payment_id = ?,
                payment_method = ?, payment_bank = ?, payment_wallet = ?, payment_vpa = ?,
                payment_card_network = ?, payment_card_type = ?, payment_card_last4 = ?,
                payment_issuer = ?, payment_currency = ?, payment_amount = ?
            WHERE id = ?
        `;
        await pool.query(query, [
            status,
            orderId,
            paymentId,
            details.method || null,
            details.bank || null,
            details.wallet || null,
            details.vpa || null,
            details.cardNetwork || null,
            details.cardType || null,
            details.cardLast4 || null,
            details.issuer || null,
            details.currency || null,
            details.amount || null,
            registrationId
        ]);
    }
}

export default PaymentModel;
