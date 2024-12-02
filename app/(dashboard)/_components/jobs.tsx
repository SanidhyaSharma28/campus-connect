
import { OngoingJobs } from "./ongoing-jobs"




export const Jobs = () => {

    return (
        <div className="">
            <h1 className=" text-center text-2xl">Upcoming Jobs</h1>
            <div className="bg-gray-300 p-2 rounded-sm flex justify-between mb-4 px-4">
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#3D85C6" }}
                    ></div>
                    <p className="ml-2 text-sm">Internship</p>
                </div>
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#CC4224" }}
                    ></div>
                    <p className="ml-2 text-sm">Placement</p>
                </div>
                <div className="flex items-center">
                    <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "#38761D" }}
                    ></div>
                    <p className="ml-2 text-sm">Internship & Placement</p>
                </div>
            </div>
            <OngoingJobs />
        </div>


    )
}