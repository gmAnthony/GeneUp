export type Organization = {
  id: string;
  name: string;
  members: string[];
  invitedMembers: string[];
  createdBy: {
    id: string;
    name: string;
  };
};

export type Project = {
  id: string;
  name: string;
  organization: {
    id: string;
    name: string;
  };
  collaborators: string[];
  notes: string;
  dateCreated: string;
  createdBy: {
    id: string;
    name: string;
  };
};
