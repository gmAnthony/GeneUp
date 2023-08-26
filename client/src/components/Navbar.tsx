import React from "react";

function Navbar() {
  const authenticated = false;

  if (authenticated) {
    return (
      <nav>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </nav>
    );
  }

  return (
    <div>
      <button>Login / Register</button>
    </div>
  );
}

export { Navbar };
