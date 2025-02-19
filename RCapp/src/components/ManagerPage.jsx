import { useState } from 'react';
import axios from "axios";

function ManagerPage() {
  // Mock data - in a real app, this would come from your backend

  const [tokens, setTokens] = useState([]);
  // const [tokens, setTokens] = useState([
  //   { id: 'token1', student: 'Kshitij', room: 'A101', time: '09:00', status: 'pending', workerId: null },
  //   { id: 'token2', student: 'Atharva', room: 'B205', time: '10:30', status: 'assigned', workerId: 'W001' },
  //   { id: 'token3', student: 'Sparsh', room: 'C310', time: '14:00', status: 'completed', workerId: 'W002' }
  // ]);
  

  const [workers, setWorkers] = useState([]);
  // const [workers, setWorkers] = useState([
  //   { id: 'W001', name: 'Worker 1', active: true },
  //   { id: 'W002', name: 'Worker 2', active: true }
  // ]);
  
  const [newWorker, setNewWorker] = useState({ name: '' });
  const [selectedToken, setSelectedToken] = useState(null);
  const [view, setView] = useState('tokens'); // 'tokens' or 'addWorker'
  
  const handleAssign = (tokenId, workerId) => {
    setTokens(tokens.map(token => 
      token.id === tokenId ? { ...token, status: 'assigned', workerId } : token
    ));
    setSelectedToken(null);
  };
  
  const handleCancel = (tokenId) => {
    setTokens(tokens.map(token => 
      token.id === tokenId ? { ...token, status: 'cancelled' } : token
    ));
  };
  
  const handleAddWorker = () => {
    const newWorkerId = `W${(workers.length + 1).toString().padStart(3, '0')}`;
    setWorkers([...workers, { id: newWorkerId, name: newWorker.name, active: true }]);
    setNewWorker({ name: '' });
    setView('tokens');
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md transition duration-200 ${view === 'tokens' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setView('tokens')}
          >
            Tokens
          </button>
          <button
            className={`px-4 py-2 rounded-md transition duration-200 ${view === 'addWorker' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setView('addWorker')}
          >
            Add Worker
          </button>
        </div>
      </div>
      
      {view === 'tokens' ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Cleaning Tokens</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Token ID</th>
                  <th className="py-2 px-4 border-b text-left">Student</th>
                  <th className="py-2 px-4 border-b text-left">Room</th>
                  <th className="py-2 px-4 border-b text-left">Time</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Worker</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map(token => (
                  <tr key={token.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{token.id}</td>
                    <td className="py-2 px-4 border-b">{token.student}</td>
                    <td className="py-2 px-4 border-b">{token.room}</td>
                    <td className="py-2 px-4 border-b">{token.time}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        token.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        token.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                        token.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {token.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {token.workerId ? 
                        workers.find(w => w.id === token.workerId)?.name || token.workerId : 
                        'Not assigned'
                      }
                    </td>
                    <td className="py-2 px-4 border-b">
                      {token.status === 'pending' && (
                        <button 
                          className="mr-2 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
                          onClick={() => setSelectedToken(token)}
                        >
                          Assign
                        </button>
                      )}
                      {(token.status === 'pending' || token.status === 'assigned') && (
                        <button 
                          className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                          onClick={() => handleCancel(token.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {selectedToken && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Assign Worker to {selectedToken.id}</h3>
                <p className="mb-4">
                  <span className="font-medium">Room:</span> {selectedToken.room}<br />
                  <span className="font-medium">Time:</span> {selectedToken.time}<br />
                  <span className="font-medium">Student:</span> {selectedToken.student}
                </p>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Select Worker</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">-- Select a worker --</option>
                    {workers.filter(w => w.active).map(worker => (
                      <option key={worker.id} value={worker.id}>{worker.name} ({worker.id})</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                    onClick={() => setSelectedToken(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => {
                      // In a real app, you'd get the selected value from the select input
                      handleAssign(selectedToken.id, 'W001');
                    }}
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Worker</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="workerName">
              Worker Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="workerName"
              value={newWorker.name}
              onChange={(e) => setNewWorker({ name: e.target.value })}
              placeholder="Enter worker name"
              required
            />
          </div>
          
          <div className="mt-6">
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
              onClick={handleAddWorker}
              disabled={!newWorker.name}
            >
              Add Worker
            </button>
            <p className="mt-2 text-sm text-gray-500">
              A unique Worker ID will be generated automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerPage;