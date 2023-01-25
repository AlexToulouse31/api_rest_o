import { BaseEntity } from "typeorm";
import { Restaurant } from "../entity/Restaurant";
export class RestaurantService extends BaseEntity {
    async allRestaurant(): Promise<Restaurant[] | undefined> {
        const resto: Restaurant[] | undefined = await Restaurant.find();

        if (resto) {
            return resto;
        }
        return undefined;
    } async getRestaurantById(restoid: number): Promise<Restaurant | undefined> {
        const resto: Restaurant | undefined = await Restaurant.findOneBy({ id: restoid });

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
    async updateRestaurant(restoId: number, restoVille: string): Promise<Restaurant | undefined> {

        const updateRestaurant: Restaurant | undefined = await Restaurant.findOneBy({ id: restoId })
        updateRestaurant.restoVille = restoVille;

        await Restaurant.save(updateRestaurant)
        if (updateRestaurant) {


            return updateRestaurant
        }
        return undefined

    } async deleteRestaurant(id: number): Promise<Restaurant | undefined> {

        const removeId = await Restaurant.findBy({ id })
        await Restaurant.remove(removeId)
        if (removeId === undefined) {
            return undefined
        }
        return removeId[0]

    }
}
