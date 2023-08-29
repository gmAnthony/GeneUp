import React from "react";

type GradientButtonProps = {
  handleClick: (e) => void;
  text: string;
  className?: string;
};

function GradientButton({
  handleClick,
  text,
  className,
}: GradientButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className} text-white mt-8 bg-gradient-to-br rounded-full from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-2 py-2.5 text-center mr-2 mb-2 w-1/4`}
    >
      {text}
    </button>
  );
}

export { GradientButton };
