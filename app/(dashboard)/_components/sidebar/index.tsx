"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ExtractDetails } from "@/utils/extract";
import Link from "next/link";

export const Sidebar = () => {
    const { user, isAdmin } = useAuth();
    const data = ExtractDetails(user?.emailAddresses[0].emailAddress || "");

    return (
        <div className="fixed z-[1] left-0 h-full w-[140px] flex p-1 pt-5 flex-col gap-y-4 text-muted-foreground border-r border-black">
            <h1 className="absolute top-0 left-0 w-full text-center">
                {isAdmin ? "Admin" : "Student"}
            </h1>
            <div className="flex flex-col justify-center items-center text-center"> {/* Center items here */}
                <div className="items-center">
                    <Avatar className="h-14 mt-5 w-14">
                        <AvatarFallback className="bg-black text-2xl">
                            {data?.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>{data?.username}</div>
                <div>{data?.branch}</div>
                <div>{data?.degree}</div>
                <div>{data?.college}</div>
                <div>{data?.joiningYear}-{parseInt(data?.joiningYear || "") + 4}</div>
            </div>
            <div style={{marginTop:"50px"}} >
                <Link href="/">
                    <Button className="text-center w-full " size="lg" variant="ghost">Home</Button>
                </Link>
                <Link href="/invites">
                    <Button className="text-center w-full " size="lg" variant="ghost">Invites</Button>
                </Link>
                <Link href="/resources">
                    <Button className="text-center w-full " size="lg" variant="ghost">Resources</Button>
                </Link>
                <Link href="/admin">
                    <Button className="text-center w-full " size="lg" variant="ghost">Admin</Button>
                </Link>
            </div>
        </div>
    );
};
