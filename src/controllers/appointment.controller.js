import { Appointment } from '../models/index.js';
import { catchError } from '../utils/index.js';
import { appointmentValidation } from '../validation/index.js';

export class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { error, value } = appointmentValidation(req.body);

      if (error) {
        return catchError(res, 400, error);
      }

      const newAppointment = await Appointment.create(value);
      return res
        .status(200)
        .json({ statusCode: 200, message: 'success', data: newAppointment });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllAppointments(__, res) {
    try {
      const allAppointments = await Appointment.find()
        .populate('patientId')
        .populate('graphId');

      return res
        .status(200)
        .json({ statusCode: 200, message: 'success', allAppointments });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAppointmentById(req, res) {
    try {
      const appointment = await AppointmentController.findAppointmentById(
        res,
        req.params.id
      );

      return res
        .status(200)
        .json({ statusCode: 200, message: 'success', data: appointment });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateAppointmentById(req, res) {
    try {
      const appointment = await AppointmentController.findAppointmentById(
        res,
        req.params.id
      );

      const updatedAppointmet = await Appointment.findByIdAndUpdate(
        appointment._id,
        req.body,
        { new: true }
      );

      return res
        .status(200)
        .json({ statusCode: 200, message: 'success', data: updatedAppointmet });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteAppointmentById(req, res) {
    try {
      const appointment = await AppointmentController.findAppointmentById(
        res,
        req.params.id
      );
      await Appointment.findByIdAndDelete(appointment._id);

      return res
        .status(200)
        .json({ statusCode: 200, message: 'success', data: {} });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  static async findAppointmentById(res, id) {
    try {
      const existsAppointment = await Appointment.findById(id)
        .populate('patientId')
        .populate('graphId');

      if (!existsAppointment) {
        return catchError(res, 404, `Appointment not found`);
      }
      return existsAppointment;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}