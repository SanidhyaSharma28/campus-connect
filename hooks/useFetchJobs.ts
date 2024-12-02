"use client";

import { useEffect, useState } from "react";

interface Job {
  id: string; // or any unique identifier type
  company: string;
  Process: string;
  Mode: string;
  Branches: string;
  Profile: string;
  date: Date; // Ensure this is a Date object
  Timings: string;
  SPOC: string;
  For: string;
}

const useFetchJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // jobs for the next 15 days
  const [totalJobs, setTotalJobs] = useState<Job[]>([]); // all jobs sorted by date
  const [loading, setLoading] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set today's time to midnight for consistent comparisons

  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(today.getDate() + 15); // Add 15 days to today's date

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/events", { method: "GET" }); // Adjust to your API endpoint
        const data: Job[] = await response.json();

        // Sort all jobs by date (oldest to latest)
        const sortedJobs = data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB; // Ascending order (oldest first)
        });

        // Set total jobs with all sorted jobs
        setTotalJobs(sortedJobs);

        // Filter jobs for the next 15 days
        const filteredJobs = sortedJobs.filter((job) => {
          const jobDate = new Date(job.date); // Convert job date to a Date object
          return jobDate >= today && jobDate <= fifteenDaysLater; // Check if job date is within the range
        });

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // The dependency array is empty because we only fetch once on mount

  return { jobs, totalJobs, loading };
};

export default useFetchJobs;
