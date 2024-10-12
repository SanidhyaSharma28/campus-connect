
"use client"

import { UserButton } from "@clerk/nextjs"


export const Navbar=()=> {
    
  return (
    <div className="bg-red-500 flex justify-between px-5 pt-2 ">
        <div>
          Search
        </div>
        <div>
          <UserButton/>
        </div>
    </div>
  )
}
