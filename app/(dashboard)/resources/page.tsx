"use client";

import { useFetchResources } from "@/hooks/useFetchResources";
import { ResourceCard } from "../_components/resources/resource-card";
import { useRouter } from "next/navigation";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";

interface ResourceProps {
  Company: string;
  _count: { Company: number };
}

const ResourcesPage = () => {
  const { loading, resources } = useFetchResources();
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: "calc(100vh - 80px)" }}>
        <LoaderPinwheel
          height="100px" // Larger size
          width="100px"
          className="animate-spin" // Spin effect
        />
      </div>
    );
  }

  // Filter resources based on the search query
  const filteredResources = resources.filter((resource: ResourceProps) =>
    resource.Company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle card click to redirect to a URL with the company name
  const handleCardClick = (company: string) => {
    const newUrl = `resources/${company}`;
    router.push(newUrl); // Navigate to the new URL
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource: ResourceProps) => (
            <ResourceCard
              onClick={() => handleCardClick(resource.Company)}
              key={resource.Company}
              company={resource.Company}
              count={resource._count}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
