import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    UserRound,
    MessageSquare,
    UserRoundPlus
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, user_role: string): Group[] {
    const menuList: Group[] = [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/",
                    label: "Home",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "/s",
                    label: "Saves",
                    icon: Bookmark
                },
                {
                    href: "/f",
                    label: "Feedback",
                    icon: MessageSquare
                },
                {
                    href: "/fo",
                    label: "Follow",
                    icon: UserRoundPlus
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Account",
                    icon: Settings
                }
            ]
        }
    ];
    return menuList;
}
