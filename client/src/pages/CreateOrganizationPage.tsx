import React from "react";
import { NewOrganizationForm } from "../components";

function CreateOrganizationPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create an organization</h2>
      <NewOrganizationForm />
    </div>
  );
}

export { CreateOrganizationPage };
