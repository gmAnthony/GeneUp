import React from "react";
import { GoogleIcon } from "./GoogleIcon";
import { useFirebase } from "../hooks/useFirebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type GoogleButtonProps = {
  action: "login" | "register";
  className?: string;
};

function GoogleButton({ action, className }: GoogleButtonProps): JSX.Element {
  const { auth } = useFirebase();

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} text-black border-t-rose-700 border-l-yellow-300 border-b-green-500 border-r-blue-600 border-2 bg-white hover:bg-slate-200  flex items-center focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm pl-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      <GoogleIcon className="mr-2" />
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
        {action === "login" ? "Login" : "Register"} with Google
      </span>
    </button>
  );
}

export { GoogleButton };
