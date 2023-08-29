import React from "react";
import { UserSettingsForm } from "../components";

function SettingsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <UserSettingsForm />
    </div>
  );
}

export { SettingsPage };
