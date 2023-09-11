import axios from "axios";

export const searchBlogs = async (
  query: string,
  signal: AbortSignal,
  setBlogs: Function
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${query}`,
      { signal }
    );

    // Handle the response data (e.g., update state with the search results)
    const searchData = response.data;

    // Do something with the search results (e.g., update state)
    console.log(searchData);
    setBlogs(searchData);
  } catch (error) {
    if (axios.isCancel(error)) {
      // The request was canceled due to a new search query
      console.log("Request canceled:", error.message);
    } else {
      // Handle other errors (e.g., network error)
      console.error("API Error:", error);
    }
  }
};
