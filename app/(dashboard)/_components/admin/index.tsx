"use client"

import { Plus } from "lucide-react";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationList } from "./org-list";
import { InviteButton } from "./invite-button";
import { useEffect, useState } from "react";
import { InviteCard } from "./invite-card";

interface OrganizationInvitationResource {
    id: string;
    emailAddress: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
}

export const Admin = () => {
    const { organization } = useOrganization();
    const [invitations, setInvitations] = useState<OrganizationInvitationResource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                if (organization) {
                    const response = await organization.getInvitations(); // Fetch invitations
                    const data = response.data; // Extract data

                    // Update only if data has changed
                    if (JSON.stringify(data) !== JSON.stringify(invitations)) {
                        setInvitations(data); // Set invitations in state
                        
                        
                    }
                    // console.log("runnning out");
                }
            } catch (err) {
                console.error("Failed to fetch invitations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvitations();
    }, [organization?.id]); // Runs when organization changes

    return (
        <div className="w-full flex justify-between ">
            <div>
                <div className="bg-black rounded-md w-20 h-20">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="aspect-square">
                                <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                                    <Plus className="text-white" />
                                </button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-transparent p-0 border-none max-w-[480px]">
                            <CreateOrganization routing="hash" />
                        </DialogContent>
                    </Dialog>
                </div>
                <OrganizationList />
            </div>
            <div className="rounded-lg border-2 max-h-[480px] border-blue-500 flex-1">
                <div className="text-center text-2xl">
                    {organization?.name}
                </div>

                <InviteButton />
                {invitations.map((invite) => (
                    <InviteCard 
                        key={invite.id} 
                        createdAt={invite.createdAt} 
                        emailId={invite.emailAddress} 
                        role={invite.role} 
                        status={invite.status} 
                        updatedAt={invite.updatedAt} 
                    />
                ))}
            </div>
        </div>
    );
};
