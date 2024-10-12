import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { EllipsisVertical } from "lucide-react";
import { Actions } from "./actions";

interface JobCardProps {
    id:number;
    isAdmin: boolean;
    company: string;
    process: string;
    mode: string;
    profile: string;
    date: Date; // This should be a valid Date object
    time: string;
    spoc: string;
}

export const JobCard = ({
    id,
    company,
    mode,
    process,
    profile,
    date,
    time,
    spoc,
}: JobCardProps) => {
    const { isAdmin: AdminOptions } = useAuth();
    
    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    

    return (
        <div className="relative w-full rounded-md border-2 border-black flex my-4 bg-blue-300 p-2">
            {AdminOptions && (
                <div className="absolute top-2 right-2 z-10">
                    <Actions id={id} side="left" sideOffset={0}>
                        <button>
                            <EllipsisVertical className="text-black" />
                        </button>
                    </Actions>
                </div>
            )}
            <div className="flex flex-col items-center w-32 bg-blue-600">
                <Avatar className="w-20 h-20 text-xl">
                    <AvatarFallback>
                        {company[0]}
                    </AvatarFallback>
                </Avatar>
                <p className="bg-red-500 text-center w-full mt-2 text-sm">{company}</p>
            </div>
            <div className="flex flex-col ml-4">
                <p>Process: {process}</p>
                <p>Mode: {mode}</p>
                <p>Profile: {profile}</p>
                <p>Date: {formattedDate}</p>
            </div>
            <div className="flex flex-col ml-4">
                <p>Time: {time}</p>
                <p>SPOC: {spoc}</p>
            </div>
        </div>
    );
};
