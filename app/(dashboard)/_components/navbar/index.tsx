"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const Navbar = () => {
  return (
    <div
      className="flex items-center justify-between px-2 py-1"
      style={{ backgroundColor: "#C5001A" }}
    >
      {/* Left side: Logo and Title */}
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.png" alt="Website Logo" className="w-16 h-10 rounded-sm cursor-pointer" />
        </Link>
        <div className="ml-3 text-white text-2xl font-semibold">Campus Connect</div>
      </div>

      {/* Right side: User Button */}
      <div className="text-white text-lg"> {/* Add larger text size */}
        <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-9 h-9' } }} /> {/* Increase avatar size */}
      </div>
    </div>
  )
}
