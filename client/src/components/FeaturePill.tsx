import React from "react";

type FeaturePillProps = {
  icon: React.ReactNode;
  text: string;
};

function FeaturePill({ icon, text }: FeaturePillProps): JSX.Element {
  return (
    <div className="flex items-center">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export { FeaturePill };
