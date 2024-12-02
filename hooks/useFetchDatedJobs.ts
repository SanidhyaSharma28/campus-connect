"use client";

import { useEffect, useState } from "react";

interface Job {
  id: string; // or any unique identifier type
  company: string;
  Process: string;
  Mode: string;
  Branches: string;
  For:string
  Profile: string;
  date: Date; // Ensure this is a Date object
  Timings: string;
  SPOC: string;
}

const useFetchDatedJobs = (date: Date | null) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!date) return; // Don't fetch if no date is selected

      setLoading(true);

      // Ensure the selected date is treated in the local timezone and adjust to midnight
      const localDate = new Date(date); 
      localDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 in local timezone
      
      // Adjust for potential timezone difference
      const adjustedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000); 

      try {
        // Send the adjusted date as a string in the format YYYY-MM-DD
        const response = await fetch(
          `/api/events?date=${adjustedDate.toISOString().split("T")[0]}`,
          { method: "GET" }
        );
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [date]);

  return { jobs, loading };
};

export default useFetchDatedJobs;
