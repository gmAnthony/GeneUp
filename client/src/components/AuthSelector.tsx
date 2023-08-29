import React from "react";
import type { Actions } from "../pages/LandingPage";

type AuthSelectorProps = {
  action: Actions;
  setAction: React.Dispatch<React.SetStateAction<Actions>>;
};

function AuthSelector({ action, setAction }: AuthSelectorProps): JSX.Element {
  const actionLabels: Actions[] = ["login", "register", "guest"];
  return (
    <div className="flex pb-8 justify-evenly z-30 items-center">
      {actionLabels.map((actionLabel, index) => (
        <React.Fragment key={index}>
          <span
            onClick={() => setAction(actionLabel)}
            className={`text-display text-white text-xl cursor-pointer ${
              actionLabel != action ? "text-opacity-10" : ""
            }`}
          >
            {actionLabel.slice(0, 1).toUpperCase() + actionLabel.slice(1)}
          </span>
          {index !== actionLabels.length - 1 && (
            <span className="text-display text-white text-3xl mx-4">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export { AuthSelector };
