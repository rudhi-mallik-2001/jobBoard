import { useEffect } from "react"
import JobCard from "./JobCard"
import { useState } from "react";
const PAGE_SIZE = 5;
const JobBoard = () => {
  const [fetchingJobDetails, setFetchingJobDetails] = useState(false);
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchJobs(page);
  }, [page]);
  const fetchJobIds = async (currPage) => {
    const jobIdsForPage = await fetchJobIds(currPage);

    setFetchingJobDetails(true);
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
        ).then((res) => res.json()),
      ),
    );
    setJobs([...jobs, ...jobsForPage]);

    setFetchingJobDetails(false);
  };

  const fetchJobsForPage = async (jobIdsForPage) => {
    setFetchingJobDetails(true);
    const jobsForPage = await Promise.all(
      jobIdsForPage.map(async (jobId) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
        return res.json();
      })
    );
    setJobs((prevJobs) => [...prevJobs, ...jobsForPage]);
    setFetchingJobDetails(false);
  };

  const fetchJobs = async (currPage) => {
    const jobIdsForPage = await fetchJobIds(currPage);
    await fetchJobsForPage(jobIdsForPage);
  };
  if (setFetchingJobDetails) {
    return (
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        <div>
          <h1 className="text-[#ff6600] text-[25px] font-bold">
            Hacker News Jobs Board
          </h1>
        </div>
        <div>Loading...</div>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col gap-2 justify-start items-start">
      <div>
        <h1 className="text-[#ff6600] text-[25px] font-bold">
          Hacker News Jobs Board
        </h1>
      </div>
      <div className="w-full flex flex-col gap-2 justify-start items-start">
        {jobs.map((job) => (
          <JobCard key={job.id} />
        ))}
      </div>
      <div>
        <button onClick={() => setPage((prevPage) => prevPage + 1)} disabled={fetchingJobDetails} className="bg-[#ff6600] hover:bg-[#ff9853] text-white font-bold py-2 px-4 rounded outline-0	">
          Button
        </button>
      </div>

    </div>
  )
}

export default JobBoard