import React from "react";
import { NewProjectForm } from "../components";

function CreateProjectPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a project</h2>
      <NewProjectForm />
    </div>
  );
}

export { CreateProjectPage };
