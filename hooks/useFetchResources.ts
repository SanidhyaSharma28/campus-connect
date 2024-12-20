
import { useEffect, useState } from "react";

export const useFetchResources = () => {
    const [loading, setLoading] = useState(false);
    const [resources,setResources]=useState([]);
    

    useEffect(() => {
        const fetchResources=async()=>{
            setLoading(true);
            try {
                const response = await fetch('/api/resources',{method:"GET"}); // Adjust to your API endpoint
                const data= await response.json();



                setResources(data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
        
        fetchResources();
    }, []);

    return { resources, loading };
};
