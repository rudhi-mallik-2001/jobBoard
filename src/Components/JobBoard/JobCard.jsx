
const JobCard = () => {
  return (
    <div className="w-full p-2 flex flex-col border-2 rounded">
        <div>
            <h2><a>hello this is test</a></h2>
        </div>
        <div className="w-full flex flex-row justify-start gap-2 items-start">
          <p>posted by rudhi</p>
          <p>23/01/24</p>
          <p>10:33:26 PM</p>
        </div>
    </div>
  )
}

export default JobCard