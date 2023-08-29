import React from "react";
import { SideNav } from "../components";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

function PrivateLayout({ children }: PrivateLayoutProps): JSX.Element {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="py-10 pl-56">{children}</div>
    </div>
  );
}

export { PrivateLayout };
