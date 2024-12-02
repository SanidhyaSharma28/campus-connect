"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useResourceContext } from "@/context/ResourceContext";
import { useFetchCompanyResources } from "@/hooks/useFetchCompanyResources";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation"; // For client-side navigation
import { useEffect } from "react";

interface CompanyResourcesProps {
  params: { company: string };
}

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

const CompanyResources = ({ params }: CompanyResourcesProps) => {
  const { company } = params;
  const { loading, resources } = useFetchCompanyResources(company);
  const { setResources } = useResourceContext()

  useEffect(() => {
    if (!loading) {
      setResources(resources); // Set resources in context
    }
  }, [loading, resources, setResources]);

  const router = useRouter(); // Next.js useRouter for navigation

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 80px)' }}>
        <LoaderPinwheel
          height="100px" // Larger size
          width="100px"
          className="animate-spin" // Spin effect
        />
      </div>

    );
  }

  const handleCardClick = (id: number) => {
    // Navigate to current URL with resource id as a query parameter
    router.push(`/resources/${company}/${id}`);
  };

  return (
    <div style={{backgroundColor:"#FDF6F6"}}>
      <div className="h-full max-w-4xl mt-5 mx-auto">
        {resources.map((resource: ResourceProps) => {
          return (
            <div
              key={resource.id}
              style={{backgroundColor:"#002C54"}}
              className="flex justify-between items-center cursor-pointer border border-2 rounded-md shadow-sm p-3 m-3"
              onClick={() => handleCardClick(resource.id)} // Navigate to URL with resource id
            >
              {/* Avatar on the left */}
              <Avatar className="w-12 h-12 text-xl">
                <AvatarFallback>{resource.Name[0]}</AvatarFallback>
              </Avatar>

              {/* "Submitted by" section on the extreme right */}
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-300">Submitted by:</span>
                <span className="text-lg font-medium text-white">{resource.Name}, {resource.Branch}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyResources;
