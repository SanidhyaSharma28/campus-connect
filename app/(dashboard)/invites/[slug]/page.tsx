

const InviteDetailPage = ({ params }:any) => {
    const { slug } = params; // Access the slug parameter

    return (
        <div>
            <h1>Invite Details for: {slug}</h1>
            {/* Add your component logic here */}
        </div>
    );
};

export default InviteDetailPage;
