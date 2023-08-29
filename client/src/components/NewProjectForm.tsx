import React, { useState } from "react";
import { Label, TextInput, Textarea, Select } from "flowbite-react";
import { GradientButton } from "./GradientButton";
import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../hooks/useFirebase";
import { useUserOrganizations } from "../hooks/useUserOrgs";

function NewProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [collaborators, setCollaborators] = useState<String[]>([]);
  const [organization, setOrganization] = useState({ id: "", name: "" });
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const organizations = useUserOrganizations();
  const { auth } = useFirebase();

  const finalCollaborators = [
    ...new Set([...collaborators, auth.currentUser?.uid || ""]),
  ];

  const handleChangeOrganization = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOrgId = e.target.value;
    const selectedOrganization = organizations.find(
      (org) => org.id === selectedOrgId
    );

    if (selectedOrganization) {
      setOrganization({
        id: selectedOrganization.id,
        name: selectedOrganization.name,
      });
    } else {
      setOrganization({ id: "", name: "" });
    }
  };

  const handleClick = async () => {
    const { db } = useFirebase();
    setSuccess(false);
    try {
      await addDoc(collection(db, "projects"), {
        name: projectName,
        collaborators: finalCollaborators,
        notes: notes,
        organization: organization,
        dateCreated: new Date(),
        createdBy: {
          id: auth.currentUser?.uid,
          name: auth.currentUser?.displayName,
        },
      });
      console.log("Project created successfully");
      setSuccess(true);
      setProjectName("");
      setCollaborators([]);
      setNotes("");
    } catch (error) {
      console.error("Error creating project: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full">
      {success && (
        <p className="text-green-500">Project created successfully</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <Label htmlFor="project-name">Project Name</Label>
        <TextInput
          id="project-name"
          name="project-name"
          required
          type="text"
          className="mb-4"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Label htmlFor="organization">Organization</Label>
        <Select
          id="organization"
          name="organization"
          className="mb-4"
          value={organization.id}
          onChange={handleChangeOrganization}
        >
          <option value="">None</option>
          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </Select>
        <Label htmlFor="collaborators">Collaborators</Label>
        <Textarea
          id="collaborators"
          name="collaborators"
          placeholder="Enter some collaborators..."
          className="mb-4 col-span-2"
          rows={4}
          value={collaborators.join(", ")}
          onChange={(e) => setCollaborators(e.target.value.split(", "))}
        />
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Enter some notes..."
          className="mb-4 col-span-2"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div />
        <GradientButton
          text="Submit"
          className="justify-self-end w-full"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export { NewProjectForm };
