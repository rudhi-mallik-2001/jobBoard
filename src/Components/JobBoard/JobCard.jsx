
const JobCard = (job) => {
  const {by,url,title,time}=job.jobDetails
  return (
    <div className="w-full p-2 flex flex-col border-2 rounded">
        <div>
            <h2><a href={`${url?url:"#"}`} target="_blank" rel="noreferrer">{title}</a></h2>
        </div>
        <div className="w-full flex flex-row justify-start gap-2 items-start">
          <p>{by} {new Date(time * 1000).toLocaleString()}</p>
        </div>
    </div>
  )
}

export default JobCard