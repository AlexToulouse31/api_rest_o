import { BaseEntity } from "typeorm";
import { Menu } from "../entity/Menu";
import { Users } from "../entity/Users";


export class MenusService extends BaseEntity {

    async selectAllMenu(): Promise<Menu[] | undefined> {
        const menu: Menu[] | undefined = await Menu.find();
        if (menu) {
            return menu;
        }
        return undefined
    }

    async selectMenuById(id: number): Promise<Menu[] | undefined> {
        const menuId: Menu[] | undefined = await Menu.findBy({ menuId: id });

        if (menuId) {
            return menuId;
        }
        return undefined
    }

    async addMenu(restoMenu: string, priceMenu: number): Promise<Menu | undefined> {
        const menu = new Menu();
        console.log(menu);

        menu.menuName = restoMenu;
        menu.price = priceMenu;
        await Menu.save(menu);
        if (menu) {
            return menu;
        }
        return undefined
    }

    async deleteMenu(menuid: number): Promise<Menu[] | undefined> {
        const delMenu: Menu[] | undefined = await Menu.findBy({ menuId: menuid });
        await Menu.remove(delMenu);
        if (delMenu) {
            return delMenu;
        }
        return undefined
    }

    async putMenu(id: number, name: string, price: number): Promise<Menu[] | undefined> {
        const updateMenu: Menu[] | undefined = await Menu.findBy({ menuId: id });
        updateMenu[0].menuName = name
        updateMenu[0].price = price
        await Menu.save(updateMenu);
        if (updateMenu) {
            console.log(updateMenu);

            return updateMenu;
        }
        return undefined
    }
    async verifMenuByMenu(restoMenu: string): Promise<Menu | undefined> {
        const menuId: Menu | undefined = await Menu.findOneBy({ menuName: restoMenu });

        if (menuId) {
            return menuId;
        }
        return undefined
    }
    async verifPassword(token: string): Promise<Users | undefined> {
        const users: Users | undefined = await Users.findOneBy({ password: token });
        if (users) {
            return users;
        }
        return undefined;

    }
}








