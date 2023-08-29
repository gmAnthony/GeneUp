import React, { useState } from "react";
import { IconDna2, IconUserShare, IconSearch } from "@tabler/icons-react";
import {
  FeaturePill,
  GradientButton,
  AuthSelector,
  AuthSection,
} from "../components";

export type Actions = "login" | "register" | "guest";

function LandingPage() {
  const [authenticating, setAuthenticating] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Actions>("login");

  const handleClick = () => {
    setAuthenticating(true);
  };

  return (
    <header className="relative flex items-center justify-left h-screen mb-12 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source
          src="https://ff78aabdf0b73791b5d1-bbec9c8fd00c4586dc96826895195f58.ssl.cf5.rackcdn.com/dna.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 z-20 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 opacity-70"></div>
      {!authenticating && (
        <div className="flex flex-col relative z-30 px-20">
          <div className="mb-0 font-display text-9xl text-white">GeneUp</div>
          <span className="text-white text-lg">
            Cloud storage solution for bioinformatics data.
          </span>
          <ul className="flex flex-col text-white mt-8">
            <li className="mb-4">
              <FeaturePill
                icon={
                  <IconDna2
                    size={32}
                    className="mr-4 bg-gradient-to-br from-purple-900 to-blue-500 p-2 rounded-full"
                  />
                }
                text="Store bioinformatics files with annotations, metadata, and
                more."
              />
            </li>
            <li className="mb-4">
              <FeaturePill
                icon={
                  <IconUserShare
                    size={32}
                    className="mr-4 bg-gradient-to-br from-purple-900 to-blue-500 p-2 rounded-full"
                  />
                }
                text="Share your data with collaborators and the public."
              />
            </li>
            <li className="mb-4">
              <FeaturePill
                icon={
                  <IconSearch
                    size={32}
                    className="mr-4 bg-gradient-to-br from-purple-900 to-blue-500 p-2 rounded-full"
                  />
                }
                text="Search, filter, and sort your data with ease."
              />
            </li>
          </ul>
          <GradientButton handleClick={handleClick} text="Get Started" />
        </div>
      )}
      <div className="flex flex-col w-1/2 max-w-lg pl-20  py-20 self-start">
        {authenticating && (
          <>
            <AuthSelector
              action={selectedAction}
              setAction={setSelectedAction}
            />
            <AuthSection selectedAction={selectedAction} />
          </>
        )}
      </div>
    </header>
  );
}

export { LandingPage };
