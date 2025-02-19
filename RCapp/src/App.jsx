import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentPage from './components/StudentPage';
import WorkerMachinePage from './components/WorkerMachinePage';
import ManagerPage from './components/ManagerPage';
import './App.css'

function App() {
  // const [currentPage, setCurrentPage] = useState('student');

  // return (
  //     <div className="min-h-screen bg-gray-100">
  //     <header className="bg-white shadow-sm">
  //       <div className="max-w-7xl mx-auto py-4 px-4">
  //         <div className="flex justify-between items-center">
  //           <h1 className="text-xl font-bold text-gray-800">RC Arbeiter</h1>
  //           <nav>
  //             <ul className="flex space-x-4">
  //               <li>
  //                 <button 
  //                   className={`px-3 py-2 rounded ${currentPage === 'student' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
  //                   onClick={() => setCurrentPage('student')}
  //                 >
  //                   Student
  //                 </button>
  //               </li>
  //               <li>
  //                 <button 
  //                   className={`px-3 py-2 rounded ${currentPage === 'worker' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
  //                   onClick={() => setCurrentPage('worker')}
  //                 >
  //                   Worker Machine
  //                 </button>
  //               </li>
  //               <li>
  //                 <button 
  //                   className={`px-3 py-2 rounded ${currentPage === 'manager' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
  //                   onClick={() => setCurrentPage('manager')}
  //                 >
  //                   Manager
  //                 </button>
  //               </li>
  //             </ul>
  //           </nav>
  //         </div>
  //       </div>
  //     </header>

  //     <main className="max-w-7xl mx-auto py-6 px-4">
  //       {currentPage === 'student' && <StudentPage />}
  //       {currentPage === 'worker' && <WorkerMachinePage />}
  //       {currentPage === 'manager' && <ManagerPage />}
  //     </main>
  //   </div>
  // )




  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <Link to="/" className="text-xl font-bold">RC Arbeiter App</Link>
            <div className="flex space-x-4">
              <Link to="/student" className="hover:text-gray-300">Student</Link>
              <Link to="/worker" className="hover:text-gray-300">Worker/Machine</Link>
              <Link to="/manager" className="hover:text-gray-300">Manager</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/worker" element={<WorkerMachinePage />} />
            <Route path="/manager" element={<ManagerPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} RC Arbeiter. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Simple home page component
function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Get Your Room Cleaned</h1>
      <p className="mb-8">Select your role to get started:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student</h2>
          <p className="mb-4">Request room cleaning services and manage your cleaning schedules.</p>
          <Link to="/student" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Continue as Student
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Worker/Machine</h2>
          <p className="mb-4">View assigned cleaning tasks and manage work schedules.</p>
          <Link to="/worker" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Continue as Worker
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manager</h2>
          <p className="mb-4">Oversee cleaning operations, staff, and system analytics.</p>
          <Link to="/manager" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Continue as Manager
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App
