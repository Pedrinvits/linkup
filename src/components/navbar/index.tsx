import { ModeToggle } from "@/components/mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";
import { auth } from "../../../auth";
import { getUserById } from "../../../data/user";
import { currentUser } from "@/lib/auth";


interface NavbarProps {
    title: string;
}

export async function Navbar({ title }: NavbarProps) {

    const user = await currentUser();
    console.log('currentUser - ', user);
    
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center justify-end gap-4">
                    <ModeToggle />
                    <UserNav username={user?.data.name} email={user?.data.email} profileImageUrl={"#"} />
                </div>
            </div>
        </header>
    );
}
