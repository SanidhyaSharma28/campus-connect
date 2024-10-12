"use client"

import { useEffect, useState } from "react";

interface Job {
    id: string; // or any unique identifier type
    company: string;
    Process: string;
    Mode: string;
    Branches:string
    Profile: string;
    date: Date; // Ensure this is a Date object
    Timings: string;
    SPOC: string;
}


type TimeFilter = "present" | "past" | "future";

interface Filters {
    time: TimeFilter; // Optional filter for specific date
    branch?: string; // Example filter for branches
    // Add more filters as needed
}

const useFetchJobs = (filters: Filters) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
      
    const today = new Date();
    
    // Set the hours, minutes, seconds, and milliseconds to zero to get just the date
    today.setHours(12, 0, 0, 0); 
    
    // Format today's date to compare with job dates correctly (YYYY-MM-DD)
    const formattedDate = today.toISOString().split('T')[0];
    
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            
            try {
                const response = await fetch('/api/events',{method:"GET"}); // Adjust to your API endpoint
                const data: Job[] = await response.json();


                // Apply filters
                const filteredJobs = data.filter((job) => {
                    let isMatch = true;

                    if (filters.time==="present") {
                        const jobDate = new Date(job.date);
                        isMatch = isMatch && jobDate.toISOString().split('T')[0] === formattedDate;
                    }

                    if (filters.time==="past") {
                        const jobDate = new Date(job.date);
                        isMatch = isMatch && jobDate.toISOString().split('T')[0] < formattedDate;
                    }

                    if (filters.time==="future") {
                        const jobDate = new Date(job.date);
                        isMatch = isMatch && jobDate.toISOString().split('T')[0] > formattedDate;
                    }
                    if (filters.branch) {
                        const branches = job.Branches.split(",").map(b => b.trim());
                        isMatch = isMatch && branches.includes(filters.branch.trim());
                    }

                    return isMatch;
                });

                setJobs(filteredJobs);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching jobs:", error);
                
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, loading};
};

export default useFetchJobs;
