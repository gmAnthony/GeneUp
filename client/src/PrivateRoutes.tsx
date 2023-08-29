import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  MainPage,
  FilesPage,
  SettingsPage,
  ProjectsPage,
  CreateProjectPage,
  UploadFilesPage,
  OrganizationPage,
  CreateOrganizationPage,
  NotFoundPage,
} from "./pages";
import { PrivateLayout } from "./layouts/PrivateLayout";

function PrivateRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateLayout>
            <MainPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/organization"
        element={
          <PrivateLayout>
            <OrganizationPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/organization/create"
        element={
          <PrivateLayout>
            <CreateOrganizationPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateLayout>
            <ProjectsPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/projects/create"
        element={
          <PrivateLayout>
            <CreateProjectPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/files"
        element={
          <PrivateLayout>
            <FilesPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/files/create"
        element={
          <PrivateLayout>
            <UploadFilesPage />
          </PrivateLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateLayout>
            <SettingsPage />
          </PrivateLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export { PrivateRoutes };
