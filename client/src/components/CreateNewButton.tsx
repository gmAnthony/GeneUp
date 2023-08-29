import React from "react";
import { Button } from "flowbite-react";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function CreateNewButton({ link }) {
  return (
    <Link to={link}>
      <button
        type="button"
        className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IconPlus size={20} />
        <span className="sr-only">Icon description</span>
      </button>
    </Link>
  );
}

export { CreateNewButton };
