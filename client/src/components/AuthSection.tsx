import React, { useState } from "react";
import { GoogleButton } from "./GoogleButton";
import { Label, TextInput } from "flowbite-react";
import { useFirebase } from "../hooks/useFirebase";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

type AuthSectionProps = {
  selectedAction: "login" | "register" | "guest";
};

function AuthSection({ selectedAction }: AuthSectionProps): JSX.Element {
  const { auth } = useFirebase();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuest = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={handleGuest}
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
        <div>
          <Label className="text-white">Name</Label>
          <TextInput
            required
            name="name"
            placeholder="Rosalind Franklin"
            className="mb-4"
            onChange={handleChange}
          />
        </div>
      )}
      <Label className="text-white">Email</Label>
      <TextInput
        required
        type="email"
        name="email"
        placeholder="rosalind@example.com"
        className="mb-4"
        onChange={handleChange}
      />
      <Label className="text-white">Password</Label>
      <TextInput
        required
        type="password"
        name="password"
        className="mb-4"
        onChange={handleChange}
      />
      <button
        type="button"
        className="text-white mt-8 bg-gradient-to-br from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-2 py-2.5 text-center mr-2 mb-2 w-1/2"
        onClick={selectedAction === "login" ? handleLogin : handleRegister}
      >
        {selectedAction.slice(0, 1).toUpperCase() + selectedAction.slice(1)}{" "}
        with Email
      </button>
    </div>
  );
}

export { AuthSection };
