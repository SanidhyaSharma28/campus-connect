"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Round {
    title: string;
    description: string;
}

interface FormData {
    Name: string;
    Phone: string;
    Email: string;
    LinkedIn: string;
    Branch: string;
    Focus: string;
    Experience: string;
    CollegeId: string;
    Company: string;
    rounds: Round[];
}

const InvitedForm = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const router = useRouter();

    const [rounds, setRounds] = useState<Round[]>([
        { title: "Round 1", description: "" },
    ]);
    const [formData, setFormData] = useState<Omit<FormData, "rounds">>({
        Name: "",
        Phone: "",
        Email: "",
        LinkedIn: "",
        Branch: "",
        Focus: "",
        Experience: "",
        Company: slug,
        CollegeId: "test@gmail.com",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, Branch: e.target.value }));
    };

    const handleRoundChange = (
        index: number,
        field: "title" | "description",
        value: string
    ) => {
        const updatedRounds = [...rounds];
        updatedRounds[index][field] = value;
        setRounds(updatedRounds);
    };

    const addRound = () => {
        if (rounds.length < 10) {
            setRounds((prev) => [...prev, { title: "", description: "" }]);
        }
    };

    const deleteRound = (index: number) => {
        if (index > 0) {
            const updatedRounds = rounds.filter((_, i) => i !== index);
            setRounds(updatedRounds);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { ...formData, rounds };

        try {
            const response = await fetch("/api/resources", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result);
            
            toast.success("Successfully created resources.");

            // Redirect to /resources
            router.push(`/resources/${slug}`);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to create resources. Please try again.");
        }
    };

    return (
        <div className="max-w-5xl mt-5 mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
            <h1 className="text-2xl font-bold mb-4">
                Please add data: {slug}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block font-semibold">Name:</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="block">Phone (optional):</label>
                    <input
                        type="text"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="block">Email (optional):</label>
                    <input
                        type="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="block">LinkedIn (optional):</label>
                    <input
                        type="text"
                        name="LinkedIn"
                        value={formData.LinkedIn}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="block font-semibold">Branch:</label>
                    {[
                        "CSE",
                        "ECE",
                        "EE",
                        "MECH",
                        "CIVIL",
                        "PRODUCTION",
                        "METALLURGY",
                        "AEROSPACE",
                        "DATA SCIENCE",
                    ].map((branch) => (
                        <div key={branch} className="flex items-center">
                            <input
                                type="radio"
                                value={branch}
                                checked={formData.Branch === branch}
                                onChange={handleBranchChange}
                                name="Branch"
                                className="mr-2"
                            />
                            <label>{branch}</label>
                        </div>
                    ))}
                </div>
                <div className="rounded border border-dashed border-gray-400 p-4 mb-4">
                    <h3 className="text-lg font-semibold">Hiring Process:</h3>
                    {rounds.map((round, index) => (
                        <div key={index} className="mb-4">
                            <label className="block font-medium">
                                Round Title:
                            </label>
                            <input
                                type="text"
                                value={round.title}
                                onChange={(e) =>
                                    handleRoundChange(index, "title", e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                            />
                            <label className="block">Description:</label>
                            <textarea
                                value={round.description}
                                onChange={(e) =>
                                    handleRoundChange(index, "description", e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => deleteRound(index)}
                                    className="text-red-500 mt-2 hover:underline"
                                >
                                    Delete Round
                                </button>
                            )}
                        </div>
                    ))}
                    {rounds.length < 10 && (
                        <button
                            type="button"
                            onClick={addRound}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Round
                        </button>
                    )}
                </div>
                <div className="form-group">
                    <label className="block">
                        Tell us more about what one should focus on:
                    </label>
                    <textarea
                        name="Focus"
                        value={formData.Focus}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group">
                    <label className="block">Your hiring experience:</label>
                    <textarea
                        name="Experience"
                        value={formData.Experience}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InvitedForm;
