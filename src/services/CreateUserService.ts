import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';
import { request } from 'express';
import AppError from '../erros/AppError';


interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password,10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
