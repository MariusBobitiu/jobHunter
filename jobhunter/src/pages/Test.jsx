// Desc: Test page for testing purposes

import Layout from "../components/Layout";
import useSearch from "../hooks/useSearch";

const Test = () => {
  const term = "developer";
  const location = "london";
  const { jobs, performSearch } = useSearch(term, location);

  //Error - reedData is not iterable -> need to test in postman for the response
  return (
    <Layout>
      <div className="w-full h-dvh">
        <div className="flex flex-col items-center justify-center gap-4 p-8 h-full w-full overflow-auto">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
          <button
            onClick={performSearch}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Fetch Jobs
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Test;
