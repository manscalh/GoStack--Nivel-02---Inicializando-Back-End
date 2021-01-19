import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.get('/', (request, response) => {
   return response.status(201).json({ message: 'Jesus é Tudo!!!' });
})

sessionsRouter.post('/', async (request, response) => {

   const { email, password } = request.body;

   const authenticateUser = new AuthenticateUserService();
   const { user, token } = await authenticateUser.execute({
      email,
      password
   });

   delete user.password;

   return response.status(202).json({ user, token });

})

export default sessionsRouter;
