const useFetch = () => {
  const fetchData = async (
    method,
    url,
    body,
    headers = { "Content-Type": "application/json" }
  ) => {
    const res = await fetch(url, {
      method: method,
      headers: headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json(); // Parse as JSON
      console.log(data);
      if (res.status !== 200) {
        throw new Error(data.message || "An unexpected error occurred");
      }
      return data; // Proceed assuming fetch was successful
    } else {
      // Handle non-JSON responses
      const text = await res.text(); // Parse as text
      throw new Error(
        text || "An error occurred, and the server didn't send JSON data."
      );
    }
  };
  return fetchData;
};

export default useFetch;
