

interface InviteCardProps{
    createdAt:Date,
    emailId:string,
    role:string,
    status:string,
    updatedAt:Date
}

export const InviteCard=({createdAt,emailId,status,role,updatedAt}:InviteCardProps)=>{
    return(
        <div>
            invitedAt:{String(createdAt)},emailId:{emailId},status:{status},role:{role},updatedAt:{String(updatedAt)}
        </div>
    )
}