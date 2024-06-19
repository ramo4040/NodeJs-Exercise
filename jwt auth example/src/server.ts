import { config } from 'dotenv';
import App from './app.js';

config() // dotenv

const server = new App()

server.startServer()