import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthentication';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentRouter.post('/', async (request, response) => {

        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoint = new CreateAppointmentService();

        const appointment = await createAppoint.execute({provider_id, date: parsedDate });

        return response.json(appointment);

});

export default appointmentRouter;
