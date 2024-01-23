import { useEffect } from "react"
import JobCard from "./JobCard"
import { useState } from "react";
import axios from "axios";
const PAGE_SIZE = 5;
const JobBoard = () => {
  const [jobIds, setJobIds] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs(page);
  }, [page]);

  const getJobIds = async (currPage) => {
    let jobs = jobIds;
    if (!jobs) {
      try {
        const res = await axios.get(
          'https://hacker-news.firebaseio.com/v0/jobstories.json',
        );
        jobs = await res.data;
        setJobIds(jobs);
      } catch (error) {
        console.log("somthings went wrong")
        setError(true)
      }
    }

    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs?.slice(start, end);
  }

  const getJobs = async (currPage) => {
    setLoading(true);
    const jobIds = await getJobIds(currPage);
    const job = await Promise.all(
      jobIds?.map((jobId) =>
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
        )
          .then((res) => res.data)
          .catch(() => {
            setError(true);
          })
        ,
      ),
    );
    setJobs([...jobs, ...job]);
    setLoading(false);
  }
  if (error) {
    return (
      <div className="w-full flex flex-col gap-2 justify-start items-start text-red-500">
        Somthing went Wrong
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
      {jobs.length == 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            {jobs.map((job) => (
              <JobCard key={job.id} jobDetails={job} />
            ))}
          </div>
          <div>
            <button onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-[#ff6600] hover:bg-[#ff9853] text-white font-bold py-2 px-4 rounded outline-0	"
            >
              {loading ? "Loading..." : "More jobs"}
            </button>
          </div>
        </>)}

    </div>
  )
}




export default JobBoard