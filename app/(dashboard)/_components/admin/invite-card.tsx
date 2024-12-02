interface InviteCardProps {
    createdAt: Date;
    emailId: string;
    role: string;
    status: string;
    updatedAt: Date;
  }
  
  export const InviteCard = ({ createdAt, emailId, status, role, updatedAt }: InviteCardProps) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-2  max-w-sm mx-2 mb-2 border-black border-2">
        {/* Email ID */}
        <div className="mb-3">
          <h3 className="text-md font-semibold text-gray-700">Email ID</h3>
          <p className="text-gray-600">{emailId}</p>
        </div>
  
        {/* Role */}
        <div className="mb-3">
          <h3 className="text-md font-semibold text-gray-700">Role</h3>
          <p className="text-gray-600">{role}</p>
        </div>
  
        {/* Status */}
        <div className="mb-3">
          <h3 className="text-md font-semibold text-gray-700">Status</h3>
          <p className={`font-medium ${status === 'pending' ? 'text-yellow-500' : status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
  
        {/* Invite Date */}
        <div className="mb-3">
          <h3 className="text-md font-semibold text-gray-700">Invited At</h3>
          <p className="text-gray-600">{new Date(createdAt).toLocaleString()}</p>
        </div>
  
        {/* Updated At */}
        <div>
          <h3 className="text-md font-semibold text-gray-700">Updated At</h3>
          <p className="text-gray-600">{new Date(updatedAt).toLocaleString()}</p>
        </div>
      </div>
    );
  };
  