import RegistrationModel from '../models/registration.model.js';

class RegistrationController {
    static async getAllRegistrations(req, res) {
        try {
            const registrations = await RegistrationModel.findAll();
            res.json({ success: true, data: registrations });
        } catch (error) {
            console.error('Error fetching registrations:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async register(req, res) {
        try {
            const data = req.body;
            
            // Basic validation
            if (!data.fullName || !data.email || !data.phone) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            // Handle uploaded files if present
            const photoUrl = req.files && req.files['photo'] ? req.files['photo'][0].path : null;
            const proofOfAgeUrl = req.files && req.files['proofOfAge'] ? req.files['proofOfAge'][0].path : null;

            const registrationData = {
                name: data.fullName,
                father_name: data.fatherName,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                gender: data.gender,
                state: data.state,
                city: data.city,
                category: data.categoryId || '10k',
                photo_url: photoUrl,
                proof_of_age_url: proofOfAgeUrl
            };

            const registrationId = await RegistrationModel.create(registrationData);
            
            res.json({
                success: true,
                message: 'Registration created successfully',
                registrationId
            });

        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ success: false, message: 'Server error during registration' });
        }
    }
}

export default RegistrationController;
