import React from "react";
import { useFirebase } from "../hooks/useFirebase";
import { IconTrash, IconMailShare, IconDownload } from "@tabler/icons-react";
import { Link } from "react-router-dom";

type FileCardProps = {
  displayName: string;
  description: string;
  downloadURL: string;
  experimentType: string;
  location: string;
  project: string;
  source: string;
  tags: string;
  owner: {
    userId: string;
    displayName: string;
  };
};

function FileCard({
  displayName,
  description,
  downloadURL,
  experimentType,
  location,
  project,
  source,
  tags,
  owner,
}: FileCardProps) {
  const { auth } = useFirebase();
  const isCreator = auth.currentUser?.uid === owner.userId;
  return (
    <div className="block w-72 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden">
      <div className="border-b-2 border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-bold truncate">{displayName}</h2>
        <p>Experiment Type: {experimentType}</p>
        <p>Project: {project}</p>
        <p>Location: {location}</p>
        <p>Source: {source}</p>
        <p>Tags: {tags}</p>
        <p className="truncate">Description: {description}</p>
        <p>Owner: {isCreator ? "You" : owner.displayName}</p>
      </div>
      <div className="flex justify-end">
        {isCreator && (
          <>
            <Link to={downloadURL}>
              <IconDownload className="mr-4 cursor-pointer" size={16} />
            </Link>
            <IconTrash className="cursor-pointer" size={16} />
          </>
        )}
      </div>
    </div>
  );
}

export { FileCard };
