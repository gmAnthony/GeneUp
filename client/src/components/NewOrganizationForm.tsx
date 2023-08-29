import React, { useState } from "react";
import { Label, TextInput, Textarea, Dropdown, Checkbox } from "flowbite-react";
import { GradientButton } from "./GradientButton";
import { useFirebase } from "../hooks/useFirebase";
import { addDoc, collection } from "firebase/firestore";

function NewOrganizationForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [members, setMembers] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { auth, db } = useFirebase();

  const handleClick = async () => {
    const memberList = members.split(",").map((email) => email.trim());
    setSuccess(false);
    try {
      await addDoc(collection(db, "organizations"), {
        name: organizationName,
        members: [auth.currentUser?.uid],
        invitedMembers: memberList,
        createdBy: {
          id: auth.currentUser?.uid,
          name: auth.currentUser?.displayName,
        },
      });

      console.log("Organization created successfully");
      setSuccess(true);

      setOrganizationName("");
      setMembers("");
    } catch (error) {
      console.error("Error creating organization: ", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full">
      {success && (
        <p className="text-green-500">Organization created successfully</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <Label htmlFor="organization-name">Organization Name</Label>
        <TextInput
          id="organization-name"
          name="organization-name"
          required
          type="text"
          className="mb-4"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <Label htmlFor="members">Members</Label>
        <Textarea
          id="members"
          name="members"
          placeholder="Enter email addresses of members separated by a comma. E.g. john@example.com, mary@example.com, etc."
          className="mb-4 col-span-2"
          rows={4}
          value={members}
          onChange={(e) => setMembers(e.target.value)}
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

export { NewOrganizationForm };
