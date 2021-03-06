import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

        const { email, password } = request.body;

        const authUser = new AuthenticationUserService();

        const { user, token } = await authUser.execute({ email, password });

        delete user.password;

        return response.json({user, token});

});

export default sessionsRouter;
