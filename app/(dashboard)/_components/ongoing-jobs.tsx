"use client"

import useFetchJobs from "@/hooks/useFetchJobs"
import { JobCard } from "./job-card";



export const OngoingJobs=()=>{
    
    const {loading,jobs}=useFetchJobs({time:"present"})
    console.log(jobs);
    

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    return (
        <div className="h-full">
            {jobs.length === 0 ? (
                <div>No jobs found</div>
            ) : (
                jobs.map(job => (
                    <JobCard
                        id={Number(job.id)}
                        key={job.id}
                        isAdmin={false} // Adjust based on your requirements
                        company={job.company}
                        process={job.Process}
                        mode={job.Mode}
                        profile={job.Profile}
                        date={new Date(job.date)}
                        time={job.Timings}
                        spoc={job.SPOC}
                    />
                ))
            )}
        </div>
    );



}