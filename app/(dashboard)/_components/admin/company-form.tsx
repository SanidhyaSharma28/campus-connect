// components/CompanyForm.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Define the type for the form data
interface FormData {
  date: string;
  company: string;
  SPOC: string;
  Process: string;
  Timings: string;
  Mode: string;
  Branches: string;
  Cutoff: number;
  Profile: string;
}

// Define the props type for CompanyForm
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
    Cutoff: 0,
    Profile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      date: "",
      company: "",
      SPOC: "",
      Process: "",
      Timings: "",
      Mode: "",
      Branches: "",
      Cutoff: 0,
      Profile: "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <br />
      <input
        type="text"
        name="SPOC"
        value={formData.SPOC}
        onChange={handleChange}
        placeholder="SPOC"
        required
      />
      <br />
      <input
        type="text"
        name="Process"
        value={formData.Process}
        onChange={handleChange}
        placeholder="Process"
        required
      />
      <br />
      <input
        type="text"
        name="Timings"
        value={formData.Timings}
        onChange={handleChange}
        placeholder="Timings"
        required
      />
      <br />
      <input
        type="text"
        name="Mode"
        value={formData.Mode}
        onChange={handleChange}
        placeholder="Mode"
        required
      />
      <br />
      <input
        type="text"
        name="Branches"
        value={formData.Branches}
        onChange={handleChange}
        placeholder="Branches"
        required
      />
      <br />
      <input
        type="number"
        name="Cutoff"
        value={formData.Cutoff}
        onChange={handleChange}
        placeholder="Cutoff"
        required
      />
      <br />
      <input
        type="text"
        name="Profile"
        value={formData.Profile}
        onChange={handleChange}
        placeholder="Profile"
        required
      />
      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CompanyForm;
