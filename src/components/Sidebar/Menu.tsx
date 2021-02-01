import React, {FC, ReactElement} from 'react';
import {ReactSVG} from 'react-svg';
// @ts-ignore
import styles from './Menu.styl';

export interface IMenuService {
  menu: IMenuItem[];
}

export interface IMenuItem extends IMenuItemData {
  id: number;
}

export interface IMenuItemData {
  name: string;
  route?: string;
  icon?: string;
}

const menuItemList: IMenuItem[] = [
  {
    name: 'First',
    route: 'user',
    icon: 'user',
  },
  {
    name: 'Second',
    route: 'team',
    icon: 'team',
  }
].map((item: IMenuItemData, index: number) => ({id: index, ...item}));

const MenuService: IMenuService = {
  menu: menuItemList,
};

const menuService = MenuService;

const Menu: FC = (): ReactElement => {
  const data: IMenuItem[] = menuService.menu;

  const getMenu = (
    menuItemList: IMenuItem[],
  ): ReactElement => {
    const classArray = [styles.menu];
    const content = menuItemList.map((menuItem: IMenuItem) =>
      getMenuItem(menuItem)
    );
    return <ul className={classArray.join(' ').trim()}>{content}</ul>;
  };

  const getMenuItem = (
    menuItem: IMenuItem,
  ): ReactElement => {

    const icon: ReactElement = menuItem.icon ? (
      <ReactSVG
        className={styles.menuItemIcon}
        src={`/icons/menu/${menuItem.icon}.svg`}
      />
    ) : (
      <div className={styles.menuItemIcon}/>
    );

    return (
      <li key={menuItem.id}>
        {icon}
        <span className={styles.menuItemText}>{menuItem.name}</span>
      </li>
    );
  };

  return <nav>{getMenu(data)}</nav>;
};

export default Menu;
