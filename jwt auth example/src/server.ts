import { config } from 'dotenv';
import App from './app';

config() // dotenv

const server = new App()

server.startServer()