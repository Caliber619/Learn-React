import { useState } from 'react'
import StudentPage from './components/StudentPage';
import WorkerMachinePage from './components/WorkerMachinePage';
import ManagerPage from './components/ManagerPage';
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('student');

  return (
      <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">RC Arbeiter</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <button 
                    className={`px-3 py-2 rounded ${currentPage === 'student' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setCurrentPage('student')}
                  >
                    Student
                  </button>
                </li>
                <li>
                  <button 
                    className={`px-3 py-2 rounded ${currentPage === 'worker' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setCurrentPage('worker')}
                  >
                    Worker Machine
                  </button>
                </li>
                <li>
                  <button 
                    className={`px-3 py-2 rounded ${currentPage === 'manager' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setCurrentPage('manager')}
                  >
                    Manager
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {currentPage === 'student' && <StudentPage />}
        {currentPage === 'worker' && <WorkerMachinePage />}
        {currentPage === 'manager' && <ManagerPage />}
      </main>
    </div>
  )
}

export default App
