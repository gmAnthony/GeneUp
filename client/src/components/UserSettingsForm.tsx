import React, { useState } from "react";
import { useFirebase } from "../hooks/useFirebase";
import { TextInput, Label } from "flowbite-react";
import { GradientButton } from "./GradientButton";
import { updateProfile } from "firebase/auth";

function UserSettingsForm(): JSX.Element {
  const { auth } = useFirebase();
  const [displayName, setDisplayName] = useState(
    auth.currentUser?.displayName || ""
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!auth.currentUser) return;

    if (displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName,
        });
        setMessage("Display name updated.");
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Label htmlFor="displayName">Display Name</Label>
        <TextInput
          id="displayName"
          name="displayName"
          placeholder="Change display name"
          className="mb-4 col-span-2"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <GradientButton
          handleClick={handleSubmit}
          text="Update"
          className="col-span-4"
        />
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}

export { UserSettingsForm };
