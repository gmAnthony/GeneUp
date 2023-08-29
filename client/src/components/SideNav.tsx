import React from "react";
import {
  IconHome,
  IconBuildingCommunity,
  IconFileUpload,
  IconSettings,
  IconLogout,
  IconArchive,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";

function SideNav() {
  const { auth } = useFirebase();
  const navItems = [
    {
      name: "Home",
      icon: <IconHome />,
      link: "/",
    },
    {
      name: "Organization",
      icon: <IconBuildingCommunity />,
      link: "/organization",
    },
    {
      name: "Projects",
      icon: <IconArchive />,
      link: "/projects",
    },
    {
      name: "Files",
      icon: <IconFileUpload />,
      link: "/files",
    },
    {
      name: "Settings",
      icon: <IconSettings />,
      link: "/settings",
    },
  ];
  return (
    <div className="text-white bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 h-screen px-6 fixed top-0 bottom-0 w-120">
      <p className="text-2xl font-display pt-10 pb-10">GeneUp</p>
      <div className="flex flex-col h-3/4 justify-between">
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="flex items-center mb-4" key={item.name}>
                  <div className="mr-4">{item.icon}</div>
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className="flex items-center mt-8 align-bottom">
          <IconLogout />
          <span className="ml-4 cursor-pointer" onClick={() => auth.signOut()}>
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
}

export { SideNav };
