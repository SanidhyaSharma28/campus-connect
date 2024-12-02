import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { EllipsisVertical } from "lucide-react";
import { Actions } from "./actions";

interface JobCardProps {
    id: number;
    isAdmin: boolean;
    company: string;
    process: string;
    mode: string;
    profile: string;
    date: Date; // This should be a valid Date object
    time: string;
    spoc: string;
    type: string; // 'internship', 'placement', or 'both'
}

export const JobCard = ({
    id,
    company,
    mode,
    process,
    profile,
    date,
    type,
    time,
    spoc,
}: JobCardProps) => {
    const { isAdmin: AdminOptions } = useAuth();

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);

    // Determine the background colors
    const backgroundColor = type === "both"
        ? "#B4D88C" // Lighter Green
        : type === "internship"
        ? "#88C4D8" // Lighter Blue
        : "#D88C8C"; // Lighter Red;

    const backgroundAvatarColor = type === "both"
        ? "#38761D" // Green
        : type === "internship"
        ? "#3D85C6" // Blue
        : "#CC4224"; // Red;

    return (
        <div
            className="relative w-full rounded-md border border-gray-300 flex my-3 p-2"
            style={{ backgroundColor: backgroundAvatarColor }}
        >
            {AdminOptions && (
                <div className="absolute top-1 right-1">
                    <Actions id={id} side="left" sideOffset={0}>
                        <button>
                            <EllipsisVertical className="text-gray-600 hover:text-gray-800" />
                        </button>
                    </Actions>
                </div>
            )}

            {/* Company Avatar Section */}
            <div
                className="flex flex-col items-center justify-center w-24 py-1 rounded-lg border border-gray-400"
                style={{ backgroundColor }}
            >
                <Avatar className="w-16 h-16">
                    <AvatarFallback>{company[0]}</AvatarFallback>
                </Avatar>
                <p className="mt-1 text-sm font-medium text-gray-800">{company}</p>
            </div>

            {/* Job Details Section */}
            <div className="flex flex-col px-3">
                <p className="text-sm">
                    <span className="font-medium">Process:</span> {process}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Mode:</span> {mode}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Profile:</span> {profile}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Date:</span> {formattedDate}
                </p>
            </div>

            {/* Additional Details Section */}
            <div className="flex flex-col px-3">
                <p className="text-sm">
                    <span className="font-medium">Time:</span> {time}
                </p>
                <p className="text-sm">
                    <span className="font-medium">SPOC:</span> {spoc}
                </p>
            </div>
        </div>
    );
};
