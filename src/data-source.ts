import "reflect-metadata"
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Menu } from "./entity/Menu"
import { Restaurant } from "./entity/Restaurant"


dotenv.config({ path: ".env" });// Permet d'éviter l'erreur "Client Password must be a string"

export const AppDataSource = new DataSource({
    type: "postgres",
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    synchronize: true,
    logging: false,
    entities: [Users, Restaurant, Menu],
    migrations: [],
    subscribers: [],
})
