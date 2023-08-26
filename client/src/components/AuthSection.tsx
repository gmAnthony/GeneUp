import React from "react";
import { GoogleButton } from "./GoogleButton";
import { Label, TextInput } from "flowbite-react";

function AuthSection({ selectedAction }) {
  if (selectedAction === "guest") {
    return (
      <div className="z-30 flex flex-col">
        <span className="text-white">
          Signing in as a guest will allow you to explore the application,
          however everything you upload will be deleted when you log out.
        </span>
        <button
          type="button"
          className="text-white mt-8 bg-gradient-to-br from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-2 py-2.5 text-center mr-2 mb-2 w-1/2"
        >
          Sign in as Guest
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative z-30">
      <GoogleButton action={selectedAction} className="mb-4 w-3/4" />
      <div className="flex justify-center items-center">
        <div className="flex-1 bg-white h-0.5"></div>
        <h1 className="px-2 text-center text-white">OR</h1>
        <div className="flex-1 bg-white h-0.5"></div>
      </div>
      {selectedAction === "register" && (
        <>
          <Label className="text-white">Name</Label>
          <TextInput
            required
            placeholder="Rosalind Franklin"
            className="mb-4"
          />
        </>
      )}
      <Label className="text-white">Email</Label>
      <TextInput
        required
        type="email"
        placeholder="rosalind@example.com"
        className="mb-4"
      />
      <Label className="text-white">Password</Label>
      <TextInput required type="password" className="mb-4" />
      <button
        type="button"
        className="text-white mt-8 bg-gradient-to-br from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-2 py-2.5 text-center mr-2 mb-2 w-1/2"
      >
        {selectedAction.slice(0, 1).toUpperCase() + selectedAction.slice(1)}{" "}
        with Email
      </button>
    </div>
  );
}

export { AuthSection };
