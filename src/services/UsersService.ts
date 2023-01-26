//import * as dotenv from 'dotenv';
import { BaseEntity } from 'typeorm';
import { Users } from '../entity/Users';

//dotenv.config({ path: ".env" });// Permet d'éviter l'erreur "Client Password must be a string"

export class UsersService extends BaseEntity {
    //fonction pour l'admin
    async allUser(): Promise<Users[] | undefined> {
        const users: Users[] | undefined = await Users.find();

        if (users) {
            return users;
        }
        return undefined;

    }
    //fonction login
    async getUserByName(name: string): Promise<Users | undefined> {
        const data = await Users.findBy({ userName: name })

        console.log(data);

        if (data[0]) {
            return data[0];
        }
        return undefined
    }
    //fonction register
    async addUser(Name: string, password: string): Promise<Users | undefined> {
        const user = new Users();
        user.userName = Name;
        user.password = password;
        await Users.save(user)
        if (user) {
            return user
        }
        return undefined
    }
    //fonction supprime user
    async deleteUser(id: number): Promise<Users | undefined> {

        const removeId = await Users.findBy({ id })
        await Users.remove(removeId)
        if (removeId === undefined) {
            return undefined
        }
        return removeId[0]

    }
    //fonction update en admin
    async updateUser(userName: string): Promise<Users | undefined> {

        const updateUser: Users | undefined = await Users.findOneBy({ userName })
        updateUser.admin = true;
        await Users.save(updateUser)
        if (updateUser.admin === true) {
            console.log(updateUser)
            return updateUser
        }
        return undefined

    }

}