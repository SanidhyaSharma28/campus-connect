"use client";
import { useRouter } from "next/navigation";
import { UserOrganizationInvitationResource } from "@clerk/types";

interface OrgCardProps {
    status: string;
    slug: string;
    role: string;
    accept: () => Promise<UserOrganizationInvitationResource>;
}

export const OrgCard = ({ slug, status, role, accept }: OrgCardProps) => {
    const router = useRouter(); // Initialize the router

    const handleAddClick = () => {
        // Redirect to the new URL
        router.push(`/invites/${slug}`);
    };

    return (
        <div className="border-2 border-gray-300 rounded-md p-4 shadow-md flex justify-between items-center mb-4 mx-5 bg-white">
            <div className="flex-1 text-lg font-semibold text-gray-800">
                <div>{slug}</div>
                <div className="text-sm text-gray-600">{role}</div>
            </div>
            
            {status === "pending" && (
                <button
                    onClick={accept}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Join
                </button>
            )}
            {status === "accepted" && (
                <button
                    onClick={handleAddClick} // Use the click handler
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add 
                </button>
            )}
        </div>
    );
};
