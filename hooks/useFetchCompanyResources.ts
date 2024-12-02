"use client";

import { useEffect, useState } from "react";

export const useFetchCompanyResources = (company: string) => {
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
   const fetchResources = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/resources?company=${company}`, { method: "GET" });
        const data = await response.json();
        

        setResources(data);
    } catch (error) {
        console.error("Error fetching resources:", error);
    } finally {
        setLoading(false); // Ensure loading is false in both success and error scenarios
    }
};

  

    fetchResources();
  }, [company]);

  return { resources, loading };
};
