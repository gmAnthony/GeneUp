import React, { useState, useEffect } from "react";
import { useUserOrganizations } from "../hooks/useUserOrgs";
import { OrganizationCard } from "../components";
import { CreateNewButton } from "../components";
import type { Organization } from "../types/sharedTypes";

function OrganizationPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const userOrganizations = useUserOrganizations();

  useEffect(() => {
    setOrganizations(userOrganizations);
  }, [userOrganizations]);

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Your Organizations</h2>
        <CreateNewButton link="/organization/create" />
      </div>
      {organizations.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {organizations.map((organization) => (
            <OrganizationCard key={organization.name} {...organization} />
          ))}
        </div>
      ) : (
        <p>
          You don't belong to any organization. To create an organization, click
          on the plus icon.
        </p>
      )}
    </div>
  );
}

export { OrganizationPage };
