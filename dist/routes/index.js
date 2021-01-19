"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_routes_1 = __importDefault(require("./appointments.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const routes = express_1.Router();
routes.use('/appointments', appointments_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
exports.default = routes;
