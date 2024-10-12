"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
            throw new Error("Failed to delete event");
        }

        const result = await response.json();
        console.log(result.message); // Log success message or handle it as needed
        // Optionally, you might want to trigger a re-fetch of data or update state here

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
                <DropdownMenuItem className="cursor-pointer p-3" onClick={() => { /* Handle copy link here */ }}>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-3" onClick={() => onDelete(id)}>
                    Delete {id}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
