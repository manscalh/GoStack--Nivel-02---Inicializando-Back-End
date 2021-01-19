import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../erros/AppError';

interface Request {
  provider_id: number;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ provider_id, date }: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);
    const findAppointmentsInSameDate = await appointmentsRepository.finByDate(appointmentDate);

    // if (findAppointmentsInSameDate) {
    //   throw Error('this appointment is already booked');
    // }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
