"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useFetchDatedJobs from "@/hooks/useFetchDatedJobs";



export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CalendarWithDialog({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null); // State to store clicked date
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // State to control Dialog visibility

  // Fetch jobs for the selected date
  
  const { jobs, loading } = useFetchDatedJobs(selectedDate);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date); // Set the clicked date
    setIsDialogOpen(true); // Open the Dialog
  };

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-6", className)} // Increased padding
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-3xl font-medium", // Increased font size
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100" // Increased button size
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex justify-between",
          head_cell:
            "text-muted-foreground rounded-md w-12 font-normal text-[1.25rem] text-center", // Ensure center alignment for header
          row: "flex w-full mt-2",
          cell: "border-2 border-grey-200 rounded-md mx-0.5 h-20 w-20 text-center text-base p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Increased cell height and width
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-full w-full p-0 font-normal aria-selected:opacity-100 transition-colors duration-200 hover:bg-gray-300" // Added hover effect
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-gray-400 text-accent-foreground", // Darker background for today's date
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ }) => <ChevronLeft className="h-5 w-5" />, // Increased icon size
          IconRight: ({  }) => <ChevronRight className="h-5 w-5" />, // Increased icon size
        }}
        onDayClick={handleDateClick} // Handle date clicks
        {...props}
      />

      {/* Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Events on {selectedDate?.toDateString()}</DialogTitle>
            <DialogDescription>
              {loading ? (
                <p>Loading jobs...</p>
              ) : jobs.length > 0 ? (
                <ul>
                  {jobs.map((job) => (
                    <div className="bg-blue-200 border-2 my-3 border-gray-600 rounded-md p-2" key={job.id}>
                      <h2 className="text-xl font-bold">{job.company}</h2>
                      <h4>{job.Profile}</h4>
                      <h4>Time:{job.Timings}</h4>
                      <h4>SPOC:{job.SPOC}</h4>
                      <h4>For:{job.For}</h4>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No jobs found for this date.</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

CalendarWithDialog.displayName = "CalendarWithDialog";

export { CalendarWithDialog };
