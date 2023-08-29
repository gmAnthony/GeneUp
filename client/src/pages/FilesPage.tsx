import React from "react";
import { CreateNewButton } from "../components";
import { FileCard } from "../components";
import { useUserFiles } from "../hooks/useUserFiles";

function FilesPage() {
  const files = useUserFiles();
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Your Files</h2>
        <CreateNewButton link="/files/create" />
      </div>
      {files.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {files.map((file) => (
            <FileCard key={file.id} {...file} />
          ))}
        </div>
      ) : (
        <p>
          You don't have any files. To upload a file, click on the plus icon.
        </p>
      )}
    </div>
  );
}

export { FilesPage };
