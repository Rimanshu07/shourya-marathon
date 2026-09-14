import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-order', PaymentController.createOrder);
router.post('/verify-payment', PaymentController.verifyPayment);

export default router;
