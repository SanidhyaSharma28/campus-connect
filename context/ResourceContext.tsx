"use client"

import { createContext, useContext, useState } from "react";

interface Round {
  id: number;
  title: string;
  description: string;
  resourceId: number;
}

interface ResourceProps {
  id: number;
  CollegeId: string;
  Name: string;
  Company: string;
  Phone: string;
  Email: string;
  LinkedIn: string;
  Branch: string;
  Experience: string;
  Focus: string;
  rounds: Round[];
}

interface ResourceContextProps {
  resources: ResourceProps[];
  setResources: (resources: ResourceProps[]) => void;
}

const ResourceContext = createContext<ResourceContextProps | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
  const [resources, setResources] = useState<ResourceProps[]>([]);

  return (
    <ResourceContext.Provider value={{ resources, setResources }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResourceContext must be used within a ResourceProvider");
  }
  return context;
};
