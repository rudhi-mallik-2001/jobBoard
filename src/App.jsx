import './App.css'
import JobBoard from './Components/JobBoard/JobBoard'
function App() {

  return (
    <div className='w-[100vw] min-h-screen flex items-start justify-center py-[15px]'>
      <div className='w-full md:w-[80%]'>
        <JobBoard />
      </div>
    </div>
  )
}

export default App
