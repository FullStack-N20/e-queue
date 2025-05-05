import Patient from '../models/patient.model.js';
import { patientValidator } from '../validation/patient.validation.js';
import { decode, encode } from '../utils/bcrypt-encrypt.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token.js';
import { catchError } from '../utils/error-response.js';

export class PatientController {
    async signupPatient(req, res) {
        try {
            const { error, value } = patientValidator(req.body);
            if (error) {
                return catchError(res, 400, error);
            }
            const { fullName, phoneNumber, password, address, age, gender } = value;
            const existPhone = await Patient.findOne({ phoneNumber });
            if (existPhone) {
                return catchError(res, 409, 'Phone number already exist');
            }
            const hashedPassword = await decode(password, 7);
            const patient = await Patient.create({
                fullName,
                phoneNumber,
                hashedPassword,
                address,
                age,
                gender
            });
            
            const accessToken = generateAccessToken()
        } catch (error) {
            return catchError(res, 500, error.message);
        }
    }
}