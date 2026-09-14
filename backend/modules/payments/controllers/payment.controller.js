import Razorpay from 'razorpay';
import crypto from 'crypto';
import PaymentModel from '../models/payment.model.js';
import RegistrationModel from '../../registrations/models/registration.model.js';

// Category Data mapping (for secure backend amount lookup)
const categories = {
    '11k': { id: '11k', amount: 110000 }, // 1100 INR in paise
    '10k': { id: '10k', amount: 100000 }, // 1000 INR in paise
};

class PaymentController {
    static async createOrder(req, res) {
        try {
            const { registrationId } = req.body;
            
            if (!registrationId) {
                return res.status(400).json({ success: false, message: 'Registration ID required' });
            }

            // Verify registration exists
            const registration = await RegistrationModel.findById(registrationId);
            
            if (!registration) {
                return res.status(404).json({ success: false, message: 'Registration not found' });
            }

            if (registration.payment_status === 'PAID') {
                return res.status(400).json({ success: false, message: 'Registration is already paid' });
            }

            const category = categories[registration.category.toLowerCase()] || categories['11k'];
            
            const keyId = process.env.RAZORPAY_KEY_ID;
            const keySecret = process.env.RAZORPAY_KEY_SECRET;

            let order;
            if (keyId === 'your_key_id' || !keyId) {
                // Mock order for local testing when keys are missing
                console.log('Using mock Razorpay order for local testing');
                order = {
                    id: `order_mock_${Date.now()}`,
                    amount: category.amount,
                    currency: "INR"
                };
            } else {
                const razorpay = new Razorpay({
                    key_id: keyId,
                    key_secret: keySecret,
                });

                const options = {
                    amount: category.amount,
                    currency: "INR",
                    receipt: `receipt_${registrationId}`,
                };

                order = await razorpay.orders.create(options);
            }

            // Save order ID temporarily
            await PaymentModel.updatePaymentStatus(registrationId, 'PENDING', order.id, null);

            res.json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID
            });

        } catch (error) {
            console.error('Create Order Error:', error);
            res.status(500).json({ success: false, message: 'Server error creating order' });
        }
    }

    static async verifyPayment(req, res) {
        try {
            const { registrationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature === expectedSign) {
                // Payment is successful
                await PaymentModel.updatePaymentStatus(registrationId, 'PAID', razorpay_order_id, razorpay_payment_id);
                return res.json({ success: true, message: 'Payment verified successfully' });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid payment signature' });
            }
        } catch (error) {
            console.error('Verify Payment Error:', error);
            res.status(500).json({ success: false, message: 'Server error verifying payment' });
        }
    }
}

export default PaymentController;
