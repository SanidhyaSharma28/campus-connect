interface ResourceCardProps {
   company: string;
  count: { "Company": number };
  onClick: () => void; // Accept the onClick handler as a prop
  }
  
  export const ResourceCard = ({ company, count,onClick }: ResourceCardProps) => {
    return (
      <div className="border-md border-2 m-2 shadow-md cursor-pointer flex  items-center justify-between p-4 h-36 bg-white rounded-lg" onClick={onClick}>

        <div className="text-xl font-bold text-gray-800">{company}</div>
        
        <div className="text-center" >
        <div className="text-2xl text-gray-600 font-semibold">
          {count.Company}
        </div>
        <div className="text-sm text-gray-500">Resources</div>
        </div>
      </div>
    );
  };
  