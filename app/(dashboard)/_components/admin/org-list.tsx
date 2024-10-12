"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { Item } from "./item";



export const OrganizationList=()=>{
    const {userMemberships}=useOrganizationList({
        userMemberships:{
            infinite:true,
        }
    });
    if (!userMemberships.data?.length) {
        return null
    }

    return(
        <ul>
            {userMemberships.data?.map((mem)=>(
                <Item id={mem.organization.id} imageUrl={mem.organization.imageUrl} key={mem.organization.id} name={mem.organization.name} />
            ))}
        </ul>
    )
}