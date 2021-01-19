import { json, Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
   const usersRepository = getRepository(User);
   const users = await usersRepository.find();

   return response.json(users);
})

usersRouter.post('/', async (request, response) => {
   const { name, email, password } = request.body;
   const createUser = new CreateUserService();
   const user = await createUser.execute({
      name,
      email,
      password
   });

   delete user.password;

   return response.status(201).json(user);

})

usersRouter.patch('/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   async (request, response) => {
      try {
         const updateUserAvatarService = new UpdateUserAvatarService();

         const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
         });

         delete user.password;

         return response.status(203).json(user);
      } catch (error) {
         return response.status(401).json({ error: error.message })
      }
   })

export default usersRouter;
