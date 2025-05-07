import { Router } from 'express';

import { AppointmentController } from '../controllers/index.js';
import { DoctorGuard, JwtAuthGuard, adminGuard } from '../middleware/index.js';

const router = Router();

const controller = new AppointmentController();

router
  .post('/', JwtAuthGuard, adminGuard, controller.createAppointment)
  .get(
    '/',
    JwtAuthGuard,
    adminGuard,
    DoctorGuard,
    controller.getAllAppointments
  )
  .get('/:id', JwtAuthGuard, controller.getAppointmentById)
  .patch('/:id', JwtAuthGuard, adminGuard, controller.updateAppointmentById)
  .delete('/:id', JwtAuthGuard, adminGuard, controller.deleteAppointmentById);

export { router as appointmentRouter };