import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Menu } from "./entity/Menu"
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env"});

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
