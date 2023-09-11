import { useState, useEffect } from "react";

export function useApi(endpoint: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to manually trigger data refetch
  const refetch = () => {
    setIsLoading(true);
    setError(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, isLoading, error, refetch }; // Include the refetch function
}
