import { BaseEntity } from "typeorm";
import { Restaurant } from "../entity/Restaurant";
import { Users } from "../entity/Users";
export class RestaurantService extends BaseEntity {
    /**
     * 
     * @returns La liste des restaurant enregistrer
     * * Fonction resersvé a l'admin
     */
    async allRestaurant(): Promise<Restaurant[] | undefined> {
        const resto: Restaurant[] | undefined = await Restaurant.find();

        if (resto) {
            return resto;
        }
        return undefined;
    } async getRestaurantByTown(restoName: string): Promise<Restaurant | undefined> {
        const resto: Restaurant | undefined = await Restaurant.findOneBy({ restoVille: restoName });

        if (resto) {
            return resto;
        }
        return undefined;
    }
    async addRestaurant(restoVille: string): Promise<Restaurant | undefined> {
        const restau = new Restaurant();
        restau.restoVille = restoVille;


        await Restaurant.save(restau)
        if (restau) {
            return restau
        }
        return undefined
    }
    async updateRestaurant(id: number, restoChoice: string): Promise<Restaurant | undefined> {


        const updateRestaurant: Restaurant | undefined = await Restaurant.findOneBy({ id: id })
        updateRestaurant.restoVille = restoChoice
        await Restaurant.save(updateRestaurant)
        if (updateRestaurant) {


            return updateRestaurant
        }
        return undefined
    }
    async deleteRestaurant(id: number): Promise<Restaurant | undefined> {

        const removeId = await Restaurant.findBy({ id })
        await Restaurant.remove(removeId)
        if (removeId === undefined) {
            return undefined
        }
        return removeId[0]
    }
    async verifByid(idPutResto: number): Promise<Restaurant | undefined> {
        const idresto: Restaurant | undefined = await Restaurant.findOneBy({ id: idPutResto });

        if (idresto) {
            return idresto;
        }
        return undefined;
    }
    async verifPassword(token: string): Promise<Users | undefined> {
        const users: Users | undefined = await Users.findOneBy({ password: token });
        if (users) {
            return users;
        }
        return undefined;

    }
}
