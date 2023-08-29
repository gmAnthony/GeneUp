import React, { useState } from "react";
import { Label, TextInput, Textarea, Select } from "flowbite-react";
import { GradientButton } from "./GradientButton";
import { useUserProjects } from "../hooks/useUserProjects";

type UploadFormProps = {
  fields: {
    description: string;
    dateCollected: string;
    source: string;
    experimentType: string;
    location: string;
    tags: string;
    project: string;
  };
  setFields: React.Dispatch<
    React.SetStateAction<{
      description: string;
      dateCollected: string;
      source: string;
      experimentType: string;
      location: string;
      tags: string;
      project: string;
    }>
  >;
  handleSubmit: (e) => void;
};

function UploadForm({
  fields,
  setFields,
  handleSubmit,
}: UploadFormProps): JSX.Element {
  const userProjects = useUserProjects();

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter a brief description..."
          className="mb-4 col-span-2"
          rows={4}
          value={fields.description}
          onChange={handleChange}
        />
        <Label htmlFor="dateCollected">Date Collected</Label>
        <TextInput
          id="dateCollected"
          name="dateCollected"
          type="date"
          className="mb-4"
          value={fields.dateCollected}
          onChange={handleChange}
        />
        <Label htmlFor="source">Source</Label>
        <TextInput
          id="source"
          name="source"
          placeholder="E.g., Human, Mouse, Plant..."
          className="mb-4"
          value={fields.source}
          onChange={handleChange}
        />
        <Label htmlFor="experimentType">Experiment Type</Label>
        <TextInput
          id="experimentType"
          name="experimentType"
          placeholder="E.g., RNA-Seq, ChIP-Seq..."
          className="mb-4"
          value={fields.experimentType}
          onChange={handleChange}
        />
        <Label htmlFor="location">Location</Label>
        <TextInput
          id="location"
          name="location"
          placeholder="E.g., Lab ABC, Field XYZ..."
          className="mb-4"
          value={fields.location}
          onChange={handleChange}
        />
        <Label htmlFor="tags">Tags</Label>
        <TextInput
          id="tags"
          name="tags"
          placeholder="E.g., Genomics, Evolution, Disease..."
          className="mb-4"
          value={fields.tags}
          onChange={handleChange}
        />
        <Label htmlFor="project">Project</Label>
        <Select
          id="project"
          name="project"
          className="mb-4"
          value={fields.project}
          onChange={handleChange}
        >
          <option value="">None</option>
          {userProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Select>
        <div />
        <GradientButton
          text="Submit"
          className="justify-self-end"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export { UploadForm };
