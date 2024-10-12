"use client"

import useFetchJobs from "@/hooks/useFetchJobs"
import { JobCard } from "./job-card";



export const FutureJobs=()=>{

    const {loading,jobs}=useFetchJobs({time:"future"})
if (loading) {
        return <div>Loading jobs...</div>;
    }

    return (
        <div>
            {jobs.length === 0 ? (
                <div>No jobs found</div>
            ) : (
                jobs.map(job => (
                    <JobCard
                        key={job.id}
                        id={Number(job.id)}
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