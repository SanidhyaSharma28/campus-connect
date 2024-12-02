"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

interface ActionsProps {
    id: number;
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const onDelete = async (id: number) => {
    try {
        const response = await fetch(`/api/events`, {
            method: "DELETE",
            body: JSON.stringify({ id }), // Sending the id in the request body
        });

        if (!response.ok) {
            toast.error("Failed to delete refresh to update")
            throw new Error("Failed to delete event");
        }
        toast.success("Event deleted refresh to update")
        
        

    } catch (error) {
        console.error("Error deleting event:", error);
        // Optionally, show a notification or alert to the user
    }
};

export const Actions = ({ id, children, side, sideOffset }: ActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem className="cursor-pointer p-3" onClick={() => onDelete(id)}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
