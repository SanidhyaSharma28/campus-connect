

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { UserOrganizationInvitationResource } from "@clerk/types"; // Import the correct type

export const useFetchInvites = () => {
    const [loading, setLoading] = useState(false);
    const [invites, setInvites] = useState<UserOrganizationInvitationResource[]>([]); // Specify the type here
    const { user } = useUser();

    useEffect(() => {
        const fetchInvites = async () => {
            setLoading(true);
            try {
                const invitesResponse = await user?.getOrganizationInvitations();
                const data = invitesResponse?.data || []; // Fallback to an empty array
                setInvites(data); // Set invites to data
            } catch (error) {
                console.error("Error fetching invites:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchInvites();
        }
    }, [user?.id]);

    return { invites, loading };
};
