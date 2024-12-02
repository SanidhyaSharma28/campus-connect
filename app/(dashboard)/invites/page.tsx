"use client";

import { useFetchInvites } from "@/hooks/useFetchInvites";
import { OrgCard } from "./_components/org_card";
import { LoaderPinwheel } from "lucide-react";
import { NoInvites } from "../_components/empty/noInvites";

const InvitesPage = () => {
  const { invites, loading } = useFetchInvites();

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 80px)' }}>
        <LoaderPinwheel
          height="100px" // Larger size
          width="100px"
          className="animate-spin" // Spin effect
        />
      </div>



    );
  }
  
  if (invites.length===0) {
    return(
      <NoInvites/>
    )
  }

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {invites.map((obj) => (
          <OrgCard
            key={obj.id} // Add a unique key for each card
            accept={obj.accept}
            status={obj.status}
            role={obj.role}
            slug={obj.publicOrganizationData.slug || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default InvitesPage;
