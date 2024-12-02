"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useResourceContext } from "@/context/ResourceContext";


const ResourceDetailsPage = ({ params }: { params: { company: string; id: string } }) => {
  const { resources } = useResourceContext();
  const { id } = params;

  // Find the resource by ID in the context
  const resource = resources.find((res) => res.id === Number(id));

  // If no resource is found, you could render an error message or handle the fallback logic
  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <div className="grid grid-cols-[1fr_6fr] grid-rows-[1fr_2fr] max-w-7xl ml-10  mt-2 ">
      {/* Top-left: Avatar and Name */}
      <div className="bg-gray-100 flex flex-col items-center justify-center  border-b border-r border-black p-4 ">
        <Avatar className="w-24 h-24 mb-2 text-4xl text-white ">
          <AvatarFallback className="bg-black">{resource.Name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-800">{resource.Name}</h1>
      </div>

      {/* Top-right: Company */}
      <div className="bg-gray-100 flex items-center justify-center border-b border-black text-5xl font-semibold text-gray-900">
        {resource.Company}
      </div>

      {/* Bottom-left: Contact Info */}
      <div className="bg-gray-50 border-r border-black p-6 text-left space-y-3">
        <p className="text-lg font-medium text-gray-700">Branch: <span className="font-semibold">{resource.Branch}</span></p>
        <p className="text-lg font-medium text-gray-700">Phone: <span className="font-semibold">{resource.Phone}</span></p>
        <p className="text-lg font-medium text-gray-700">Email: <span className="font-semibold">{resource.Email}</span></p>
      </div>

      {/* Bottom-right: Experience and Interview Rounds */}
      <div className="bg-gray-50 p-6">
        <div className="text-2xl font-bold text-gray-800 mb-4">Interview Rounds</div>
        {resource.rounds.map((round) => (
          <div key={round.id} className="mt-2 border-b border-gray-300 pb-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{round.title}</h3>
            <p className="text-gray-600">{round.description}</p>
          </div>
        ))}
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <div className="text-lg font-semibold text-gray-800 mb-2">Hiring Experience:</div>
          <div className="text-base text-gray-600">{resource.Experience}</div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailsPage;
