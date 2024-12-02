"use client";

import useFetchJobs from "@/hooks/useFetchJobs";
import { JobCard } from "./job-card";
import { useState } from "react";
import { DownloadEventsExcel } from "./DownloadEventsDoc";

export const OngoingJobs = () => {
  const { loading, jobs,totalJobs } = useFetchJobs();
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 4;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get current page jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="h-full">
      {jobs.length === 0 ? (
        <div>No jobs found</div>
      ) : (
        <div>
          {currentJobs.map((job) => (
            <JobCard
              id={Number(job.id)}
              key={job.id}
              type={job.For}
              isAdmin={false} // Adjust based on your requirements
              company={job.company}
              process={job.Process}
              mode={job.Mode}
              profile={job.Profile}
              date={new Date(job.date)}
              time={job.Timings}
              spoc={job.SPOC}
            />
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 border rounded-full disabled:opacity-50"
              aria-label="Previous page"
            >
              ←
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-full disabled:opacity-50"
              aria-label="Next page"
            >
              →
            </button>
          </div>
          
          <DownloadEventsExcel events={totalJobs}/>
        </div>
      )}
    </div>
  );
};
