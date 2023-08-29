import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export { PublicRoutes };
