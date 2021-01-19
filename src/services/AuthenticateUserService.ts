import { compare } from "bcrypt";
import { getRepository } from "typeorm";
import User from "../models/User";
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface Request {
   email: string;
   password: string;
}
interface Response {
   user: User,
   token: string,
}

class AuthenticateUserService {

   public async execute({ email, password }: Request): Promise<Response> {

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
         throw new AppError('Incorrect email/password combination.',401)
      }
      const passwordFind = await compare(password, user.password);

      if (!passwordFind) {
         throw new AppError('Incorrect email/password combination.',401)
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
         subject: user.id.toString(),
         expiresIn,
      });

      return { user, token };
   }
}
export default AuthenticateUserService;
