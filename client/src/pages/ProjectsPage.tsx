import React, { useState, useEffect } from "react";
import { useUserProjects } from "../hooks/useUserProjects";
import { ProjectCard } from "../components";
import { CreateNewButton } from "../components";
import type { Project } from "../types/sharedTypes";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const userProjects = useUserProjects();
  useEffect(() => {
    setProjects(userProjects);
  }, [userProjects]);

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Your Projects</h2>
        <CreateNewButton link="/projects/create" />
      </div>
      {projects.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <p>
          You don't have any projects. To create a project, click on the plus
          icon.
        </p>
      )}
    </div>
  );
}

export { ProjectsPage };
