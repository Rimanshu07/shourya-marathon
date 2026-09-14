import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import registrationRoutes from './modules/registrations/routes/registration.routes.js';
import paymentRoutes from './modules/payments/routes/payment.routes.js';
import aiRoutes from './modules/ai/routes/ai.routes.js';

import adminRoutes from './modules/registrations/routes/admin.routes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API routes
app.use('/api', registrationRoutes);
app.use('/api', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

export default app;
