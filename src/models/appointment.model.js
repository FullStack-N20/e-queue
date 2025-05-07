import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema(
  {
    complaint: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    graphId: {
      type: Schema.Types.ObjectId,
      ref: 'Graph',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);



export const Appointment = model('Appointment', appointmentSchema);