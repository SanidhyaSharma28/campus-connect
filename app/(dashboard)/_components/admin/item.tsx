"use client"
 

import Image from "next/image"
import {useOrganization,useOrganizationList} from "@clerk/nextjs"

import { cn } from "@/lib/utils"

interface ItemProps{
    id:string;
    name:string;
    imageUrl:string;
}

export const Item=({id,name,imageUrl}:ItemProps)=>{

    const {organization}=useOrganization();
    const {setActive}=useOrganizationList();

    const isActive=organization?.id===id; 

    const onClick=()=>{
        if(!setActive) return null;

        setActive({organization:id})
    }

    return(
        <div className="border-2px-solid rounded-md flex ">

        <div className="aspect-square relative my-1 w-20 h-20">
            
                <Image fill alt={name} src={imageUrl} onClick={onClick} className={cn("rounded-md  cursor-pointer opacity-75 hover:opacity-100 transition",isActive && "opacity-100")}  />
            
        </div>
                <div className="flex justify-center items-center m-5">
                    {name}
                </div>
        </div>
    )
}