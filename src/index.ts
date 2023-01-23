import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Restaurant } from "./entity/Restaurant"


AppDataSource.initialize()
    .then(async () => {

    }).catch(error => console.log(error))
