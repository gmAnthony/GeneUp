import React from "react";
import { useFirebase } from "../hooks/useFirebase";
import { useUserFiles } from "../hooks/useUserFiles";
import { useUserOrganizations } from "../hooks/useUserOrgs";
import { useUserProjects } from "../hooks/useUserProjects";
import { FileCard, ProjectCard, OrganizationCard } from "../components";
import { CreateNewButton } from "../components";

function MainPage() {
  const { auth } = useFirebase();
  const userFiles = useUserFiles();
  const userOrganizations = useUserOrganizations();
  const userProjects = useUserProjects();

  return (
    <>
      <h1 className="text-3xl font-bold pb-8">
        Welcome, {auth.currentUser?.displayName || "Friend"}
      </h1>
      <div className="pb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Your Projects</h2>
          <CreateNewButton link="/projects/create" />
        </div>
        {userProjects.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {userProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <p>
            You don't have any projects. To create a project, click the plus
            icon.
          </p>
        )}
      </div>
      <div className="pb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Your Files</h2>
          <CreateNewButton link="/files/create" />
        </div>
        {userFiles.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {userFiles.map((file) => (
              <FileCard key={file.id} {...file} />
            ))}
          </div>
        ) : (
          <p>
            You don't have any files uploaded. To upload, click the plus icon.
          </p>
        )}
      </div>
    </>
  );
}

export { MainPage };
