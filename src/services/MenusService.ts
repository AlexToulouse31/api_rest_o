import { BaseEntity } from "typeorm";
import { Menu } from "../entity/Menu";

export class MenuService extends BaseEntity {
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

    async deletedMenu(id: number): Promise<Menu[] | undefined> {
        const delMenu: Menu[] | undefined = await Menu.findBy({ id });
        await Menu.remove(delMenu);
        if (delMenu) {
            return delMenu;
        }
        return undefined
    }
}








