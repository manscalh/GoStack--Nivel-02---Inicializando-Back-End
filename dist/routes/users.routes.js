"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const usersRouter = express_1.Router();
usersRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = typeorm_1.getRepository(User_1.default);
    const users = yield usersRepository.find();
    return response.json(users);
}));
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService_1.default();
        const user = yield createUser.execute({
            name,
            email,
            password
        });
        delete user.password;
        return response.status(201).json(user);
    }
    catch (err) {
        return response.status(401).json({ error: err.message });
    }
}));
exports.default = usersRouter;
