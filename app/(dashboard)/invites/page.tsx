"use client";

import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import { OrganizationList } from "../_components/admin/org-list";
import { useFetchInvites } from "@/hooks/useFetchInvites";
import { OrgCard } from "./_components/org_card";

const InvitesPage = () => {
  const { invites, loading } = useFetchInvites();

  if (loading) {
    return (
      <div>
        Loading.....
      </div>
    );
  }
  console.log(invites);

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
