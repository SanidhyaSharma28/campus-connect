"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  date: string;
  company: string;
  SPOC: string;
  Process: string;
  Timings: string;
  Mode: string;
  Branches: string;
  Cutoff: string;
  Profile: string;
  For: string;
}

interface CompanyFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    company: "",
    SPOC: "",
    Process: "",
    Timings: "",
    Mode: "",
    Branches: "",
    Cutoff: "",
    Profile: "",
    For: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("1:",formData);
    
    await onSubmit(formData);
    setFormData({
      date: "",
      company: "",
      SPOC: "",
      Process: "",
      Timings: "",
      Mode: "",
      Branches: "",
      Cutoff: "",
      Profile: "",
      For: "",
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-96 p-6 bg-[#1e2235] rounded-xl shadow-md">
        <h2 className="text-white text-2xl font-bold text-center mb-2">Welcome</h2>
        <p className="text-gray-400 text-sm text-center mb-4">Create an event!</p>

        {/* Scrollable Form */}
        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* SPOC */}
          <input
            type="text"
            name="SPOC"
            value={formData.SPOC}
            onChange={handleChange}
            placeholder="SPOC"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Process */}
          <input
            type="text"
            name="Process"
            value={formData.Process}
            onChange={handleChange}
            placeholder="Process"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Timings */}
          <input
            type="text"
            name="Timings"
            value={formData.Timings}
            onChange={handleChange}
            placeholder="Timings"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Mode */}
          <input
            type="text"
            name="Mode"
            value={formData.Mode}
            onChange={handleChange}
            placeholder="Mode"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Branches */}
          <input
            type="text"
            name="Branches"
            value={formData.Branches}
            onChange={handleChange}
            placeholder="Branches"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Cutoff */}
          <input
            type="text"
            name="Cutoff"
            value={formData.Cutoff}
            onChange={handleChange}
            placeholder="Cutoff"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Profile */}
          <input
            type="text"
            name="Profile"
            value={formData.Profile}
            onChange={handleChange}
            placeholder="Profile"
            className="w-full px-4 py-2 rounded-lg bg-[#2a2f47] text-gray-300 focus:outline-none"
            required
          />

          {/* Opportunity Type */}
          <div className="space-y-2">
            <p className="text-gray-400">Opportunity Type:</p>
            <div className="flex items-center">
              <input
                type="radio"
                id="internship"
                name="For"
                value="internship"
                checked={formData.For === "internship"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="internship" className="text-gray-300">Internship</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="placement"
                name="For"
                value="placement"
                checked={formData.For === "placement"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="placement" className="text-gray-300">Placement</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="both"
                name="For"
                value="both"
                checked={formData.For === "both"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="both" className="text-gray-300">Both</label>
            </div>
          </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </Button>
        </form>

      </div>
    </div>
  );
};

export default CompanyForm;



