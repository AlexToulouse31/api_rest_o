import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Menu } from "./entity/Menu"

AppDataSource.initialize().then(async () => {


}).catch(error => console.log(error))
