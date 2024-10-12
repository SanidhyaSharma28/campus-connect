"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import CompanyForm from "./_components/admin/company-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Jobs } from "./_components/jobs";


const DashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const handleFormSubmit = async (formData: {
    date: string;
    company: string;
    SPOC: string;
    Process: string;
    Timings: string;
    Mode: string;
    Branches: string;
    Cutoff: number;
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
      
      // Handle success as needed
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="h-[calc(100%-42px)] p-6 flex justify-between">
      <div className="flex-1 items-center">
        <div className="flex justify-center">
          <Calendar className="" />
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
      <div className=" flex-1">
        <Jobs/>
      </div>
    </div>
  );
};

export default DashboardPage;
