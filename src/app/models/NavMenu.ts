import { NavDetail } from './navdetail';
export interface NavMenu {
    name: string;
    subMenuList: NavDetail[];
    isOpened?: boolean;
}
