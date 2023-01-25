import { BaseEntity } from "typeorm";
import { Menu } from "../entity/Menu";

export class MenusService extends BaseEntity {

    async selectAllMenu(): Promise<Menu[] | undefined> {
        const menu: Menu[] | undefined = await Menu.find();
        if (menu) {
            return menu;
        }
        return undefined
    }

    async selectMenuById(id: number): Promise<Menu[] | undefined> {
        const menuId: Menu[] | undefined = await Menu.findBy({ id });
        if (menuId) {
            return menuId;
        }
        return undefined
    }

    async addMenu(restoMenu: string): Promise<Menu[] | undefined> {
        const menu = new Menu();
        menu.menuName = restoMenu;
        await Menu.save(menu);
        if (menu) {
            return menu[0];
        }
        return undefined
    }

    async deleteMenu(menuid: number): Promise<Menu[] | undefined> {
        const delMenu: Menu[] | undefined = await Menu.findBy({ id: menuid });
        await Menu.remove(delMenu);
        if (delMenu) {
            return delMenu;
        }
        return undefined
    }

    async putMenu(id: number, menuName: string): Promise<Menu[] | undefined> {
        const updateMenu: Menu[] | undefined = await Menu.findBy({ menuName });
        updateMenu[0].menuName

        await Menu.save(updateMenu);
        if (updateMenu) {
            return updateMenu;
        }
        return undefined
    }
}








