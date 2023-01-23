import "reflect-metadata"
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { User } from "./entity/User"



dotenv.config({ path: ".env" }); //permet d'éviter l'erreur "client Password must be a string"
export const AppDataSource = new DataSource({
    type: "postgres",
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
