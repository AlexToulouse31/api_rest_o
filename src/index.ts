import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Restaurant } from "./entity/Restaurant"
import { Menu } from "./entity/Menu"

AppDataSource.initialize().then(async () => {


    AppDataSource.initialize()
        .then(async () => {

        }).catch(error => console.log(error))
})
