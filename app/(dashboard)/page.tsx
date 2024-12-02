"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import CompanyForm from "./_components/admin/company-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Jobs } from "./_components/jobs";
import { CalendarWithDialog } from "./_components/CalendarWithDialog";
import toast from "react-hot-toast";

const DashboardPage: React.FC = () => {
  const { isAdmin } = useAuth();

  const handleFormSubmit = async (formData: {
    date: string;
    company: string;
    SPOC: string;
    Process: string;
    Timings: string;
    Mode: string;
    Branches: string;
    Cutoff: string;
    Profile: string;
  }) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      console.log(data);
      
      toast.success("Event created successfully. Refresh to view ");
      // Handle success as needed
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="h-[calc(100%-42px)] p-6 flex justify-between">
      {/* Left Section */}
      <div className="flex-1 items-center">
        <div className="flex justify-center">
          <CalendarWithDialog />
        </div>
        <div className="flex justify-center">
          {isAdmin && (
            <Dialog>
              <DialogTrigger>
                <Button>Add Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new Event?</DialogTitle>
                  <DialogDescription>
                    Add info about new hiring process
                  </DialogDescription>
                </DialogHeader>
                <CompanyForm onSubmit={handleFormSubmit} /> {/* Render the CompanyForm */}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Vertical Line Separator */}
      <div className="w-[2px] bg-gray-300 mx-4"></div>

      {/* Right Section */}
      <div className="flex-1">
        <Jobs />
      </div>
    </div>
  );
};

export default DashboardPage;
