import React from "react";
import { useFirebase } from "../hooks/useFirebase";
import { IconTrash, IconMailShare } from "@tabler/icons-react";
import type { Organization } from "../types/sharedTypes";

function OrganizationCard({
  name,
  members,
  invitedMembers,
  createdBy,
}: Organization) {
  const { auth } = useFirebase();
  const isCreator = createdBy.id === auth.currentUser?.uid;
  return (
    <div className="block w-72 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden">
      <div className="border-b-2 border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-bold truncate">{name}</h2>
        <p>Members: {members.length}</p>
        <p>Invited Members: {invitedMembers.length}</p>
        <p>Created By: {isCreator ? "You" : createdBy.name}</p>
      </div>
      <div className="flex justify-end">
        {isCreator && (
          <>
            <IconMailShare className="mr-4 cursor-pointer" size={16} />
            <IconTrash className="cursor-pointer" size={16} />
          </>
        )}
      </div>
    </div>
  );
}

export { OrganizationCard };
